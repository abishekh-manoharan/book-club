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
    private IClubService clubService;

    public MeetingController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers, IClubService clubService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
        this.clubService = clubService;
    }

    // action method that creates a meeting for a reading instance
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateMeeting([FromBody] MeetingCreationValidationDto meeting)
    {
        Console.WriteLine("TEST");
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
                    StartTime = (DateTime)meeting.StartTime!,
                    EndTime = meeting.EndTime,
                    Name = meeting.Name,
                    Description = meeting.Description
                };

                dbContext.Meetings.Add(newMeeting);
                await dbContext.SaveChangesAsync();

                // ensuring that there are only 3 concluded meetings for a reading in db
                // retrieve meetings that are past, and are not a part of the most recent 3 concluded meetings
                DateTime now = DateTime.UtcNow;
                var concludedMeetingsToRemove = dbContext.Meetings
                    .Where(
                        m => m.BookId == meeting.BookId && m.ClubId == meeting.ClubId // ensure we only get the meetings associated with the reading
                        && m.EndTime < now // ensure meetings are past
                    )
                    .OrderByDescending(m => m.EndTime)
                    .Skip(3) // ensure the meetings are not the last 3 meetings
                    .ToList();
                
                Console.WriteLine(now);
                Console.WriteLine(concludedMeetingsToRemove[0]!.EndTime);
                
                // delete those meetings 
                dbContext.Meetings.RemoveRange(concludedMeetingsToRemove);
                await dbContext.SaveChangesAsync();

                MeetingDTO newMeetingDTO = new()
                {
                    MeetingId = newMeeting.MeetingId,
                    BookId = newMeeting.BookId,
                    ClubId = newMeeting.ClubId,
                    StartTime = newMeeting.StartTime,
                    EndTime = newMeeting.EndTime,
                    Name = newMeeting.Name,
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
    [Authorize]
    public async Task<ActionResult<List<MeetingDTO>>> GetAllMeetings([FromQuery] ReadingGetOneValDTO reading)
    {
        // ensure required parameters are included
        if (ModelState.IsValid)
        {
            // ensure reading exists
            if (clubService.DoesReadingExist((int)reading.ClubId!, (int)reading.BookId!))
            {
                // ensure that user is a club member if the club is private
                // checking if club is private
                bool? isPrivate = clubService.IsClubPrivate((int)reading.ClubId!);
                if (isPrivate == true)
                {
                    // ensure user is a club member
                    var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)reading.ClubId!);
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
                        meeting.ClubId == (int)reading.ClubId! &&
                        meeting.BookId == (int)reading.BookId!
                    ).ToList();

                List<MeetingDTO> meetingsDTOs = [];
                foreach (Meeting meeting in meetings)
                {
                    MeetingDTO meetingDTO = new()
                    {
                        MeetingId = meeting.MeetingId,
                        Name = meeting.Name,
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
    [HttpGet("GetAMeeting")]
    public async Task<ActionResult<List<MeetingDTO>>> GetAMeeting([Required] int meetingId)
    {
        // ensure required parameters are included
        if (ModelState.IsValid)
        {
            var meeting = dbContext.Meetings.Where(meeting => meeting.MeetingId == meetingId).AsNoTracking().FirstOrDefault();

            // ensure meeting exists
            if (meeting != null)
            {
                // ensure that user is a club member if the club is private
                // checking if club is private
                bool? isPrivate = clubService.IsClubPrivate(meeting.ClubId);
                if (isPrivate == true)
                {
                    // ensure user is a club member
                    var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, meeting.ClubId);
                    // case where user isn't a member of the private club
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
                MeetingDTO meetingDTO = new()
                {
                    MeetingId = meeting.MeetingId,
                    BookId = meeting.BookId,
                    ClubId = meeting.ClubId,
                    StartTime = meeting.StartTime,
                    EndTime = meeting.EndTime,
                    Description = meeting.Description,
                };
                return Ok(meetingDTO);
            }
            return NotFound("Meeting doesn't exist.");
        }
        return BadRequest(ModelState);
    }

    // action method that updates a meeting's information
    [HttpPut("update")]
    [Authorize]
    public async Task<ActionResult<Meeting>> UpdateMeeting([Required] int meetingId, string? description, [Required] DateTime startTime, DateTime? endTime)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            var meeting = dbContext.Meetings.Where(meeting => meeting.MeetingId == meetingId).FirstOrDefault();
            if (meeting != null)
            {
                // ensure logged in user is the club's admin
                bool? admin = await authHelpers.IsUserAdminOfClub(User, meeting.ClubId);
                if (admin == true)
                {
                    try
                    {
                        meeting.Description = description;
                        meeting.StartTime = startTime;
                        meeting.EndTime = endTime;
                        dbContext.SaveChanges();

                        MeetingDTO meetingDTO = new() { MeetingId = meeting.MeetingId, BookId = meeting.BookId, ClubId = meeting.ClubId, Description = meeting.Description, StartTime = meeting.StartTime, EndTime = meeting.EndTime };
                        return Ok(meetingDTO);
                    }
                    catch (Exception e)
                    {
                        return StatusCode(500, "Error updating the meeting. \n" + e.Message);
                    }
                }
                return Unauthorized("User isn't authorized to update a meeting for this club.");
            }
            return NotFound("Meeting doesn't exist");
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that deletes a meeting instance
    [HttpDelete("delete")]
    [Authorize]
    public async Task<ActionResult<Meeting>> DeleteMeeting([FromBody][Required] int? meetingId)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure meeting exists
            var meeting = dbContext.Meetings.Where(meeting => meeting.MeetingId == meetingId).FirstOrDefault();
            if (meeting != null)
            {
                // ensure logged in user is the club's admin
                bool? admin = await authHelpers.IsUserAdminOfClub(User, meeting.ClubId);
                if (admin == true)
                {
                    try
                    {
                        dbContext.Meetings.Remove(meeting);
                        dbContext.SaveChanges();

                        MeetingDTO meetingDTO = new() { MeetingId = meeting.MeetingId, BookId = meeting.BookId, ClubId = meeting.ClubId, Description = meeting.Description, StartTime = meeting.StartTime, EndTime = meeting.EndTime };
                        return Ok(meetingDTO);
                    }
                    catch (Exception e)
                    {
                        return StatusCode(500, "Error updating the meeting. \n" + e.Message);
                    }
                }
                return Unauthorized("User isn't authorized to delete a meeting.");
            }
            return NotFound("Meeting doesn't exist");
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

}



