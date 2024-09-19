using System.ComponentModel.DataAnnotations;
using System.Data.Common;
using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using BookClubApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Mysqlx.Notice;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class MeetingController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;

    public MeetingController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
    }

    // action method that creates a meeting for a reading instance
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateMeeting(MeetingCreationValidationDto meeting)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure logged in user is the club's admin
            bool? admin = await authHelpers.IsUserAdminOfClub(User, (int)meeting.ClubId!); // we can ignore this warning because ClubId will not be null here
            if (admin == null || admin == false)
            {
                return Unauthorized("User isn't authorized to create a reading for this club.");
            }

            // create meeting
            try
            {
                Meeting newMeeting = new()
                {
                    BookId = (int)meeting.BookId!,
                    ClubId = (int)meeting.ClubId!,
                    StartTime = (DateTime) meeting.StartTime!,
                    EndTime = meeting.EndTime,
                    Description = meeting.Description
                };
                
                dbContext.Meetings.Add(newMeeting);
                dbContext.SaveChanges();

                MeetingDTO newMeetingDTO = new () {
                    MeetingId = newMeeting.MeetingId,
                    BookId = newMeeting.BookId,
                    ClubId = newMeeting.ClubId,
                    StartTime = newMeeting.StartTime,
                    EndTime = newMeeting.EndTime,
                    Description = newMeeting.Description
                };

                return Ok(newMeetingDTO);
            }
            catch (DbUpdateException dbe)
            {
                // if reading exists already, return 409 conflict status
                if (dbe.InnerException!.Message.Contains("Duplicate"))
                {
                    return Conflict("Meeting already exists.");
                }
                else if (dbe.InnerException!.Message.Contains("foreign key constraint fails"))
                {
                    return BadRequest("FK constraint violated. Ensure reading is valid.");
                }
                
                return StatusCode(500, "Error saving the reading to the database. \n" + dbe.Message);
            }
            catch (Exception e)
            {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that returns all meetings of a reading instance    
    [HttpGet("GetAllMeetings")]
    public async Task<ActionResult<List<MeetingDTO>>> GetAllMeetings([Required] int clubId, [Required] int bookId)
    {
        // ensure required parameters are included
        if (ModelState.IsValid)
        {
            // ensure reading exists
            if (clubService.DoesReadingExist(clubId, bookId))
            {
                // ensure that user is a club member if the club is private
                // checking if club is private
                bool? isPrivate = clubService.IsClubPrivate(clubId);
                if (isPrivate == true)
                {
                    // ensure user is a club member
                    var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
                    if (clubUser == null)
                    {
                        return Unauthorized("User must be member of the club to view it's meetings.");
                    }
                }
                else if (isPrivate == null)
                {
                    return NotFound("Ensure club exists.");
                }

                // code reaches here if club isn't private or the user is a club member if it is private
                // return a list of meetings associated with the club
                var meetings = dbContext.Meetings
                    .Where(meeting =>
                        meeting.ClubId == clubId &&
                        meeting.BookId == bookId
                    ).ToList();

                List<MeetingDTO> meetingsDTOs = [];
                foreach (Meeting meeting in meetings)
                {
                    MeetingDTO meetingDTO = new()
                    {
                        MeetingId = meeting.MeetingId,
                        BookId = meeting.BookId,
                        ClubId = meeting.ClubId,
                        StartTime = meeting.StartTime,
                        EndTime = meeting.EndTime,
                        Description = meeting.Description,
                    };
                    meetingsDTOs.Add(meetingDTO);
                }

                return Ok(meetingsDTOs);
            }
            return NotFound("Reading doesn't exist.");
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that returns a specific meeting


    // action method that updates a meeting's information

    // action method that deletes a meeting instance
}