using System.ComponentModel.DataAnnotations;
using System.Text.Json;
using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using BookClubApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using MySqlConnector;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class AnnouncementController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;
    public AnnouncementController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelper, IClubService clubService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelper;
        this.clubService = clubService;
    }

    // action method that creates a thread for a reading instance. not applicable to replies to existing threads (see reply)
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<AnnouncementThreadDTO>> CreateAnnouncement([FromBody] AnnouncementCreationValDTO thread)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure user is a club member of the club associated with the thread being created
            var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)thread.ClubId!);

            if (clubUser == null || clubUser.Admin == false)
            {
                return Unauthorized("User isn't authorized to create an announcement for this club.");
            }

            // create thread
            try
            {
                var user = await authHelpers.GetUserClassOfLoggedInUser(User);

                AnnouncementThread newAnnouncement = new()
                {
                    ParentAnnouncementThreadId = null,
                    ClubId = (int)thread.ClubId!,
                    UserId = user!.UserId,
                    Text = thread.Text,
                    Heading = thread.Heading,
                    TimePosted = DateTime.UtcNow,
                    Deleted = false,
                    Pinned = thread.Pinned
                };

                dbContext.AnnouncementThreads.Add(newAnnouncement);
                dbContext.SaveChanges();

                AnnouncementThreadDTO newThreadDTO = new(
                    newAnnouncement.AnnouncementThreadId, 
                    newAnnouncement.ParentAnnouncementThreadId, 
                    newAnnouncement.ClubId, 
                    newAnnouncement.UserId, 
                    newAnnouncement.Text, 
                    newAnnouncement.Heading, 
                    newAnnouncement.Pinned,                    newAnnouncement.Deleted,
                    newAnnouncement.TimePosted); 

                return Ok(newThreadDTO);
            }
            catch (DbUpdateException dbe)
            {
                // if reading exists already, return 409 conflict status
                if (dbe.InnerException!.Message.Contains("Duplicate"))
                {
                    return Conflict("Announcement already exists.");
                }
                else if (dbe.InnerException!.Message.Contains("foreign key constraint fails"))
                {
                    return BadRequest("FK constraint violated. Ensure reading is valid.");
                }

                return StatusCode(500, "Error saving the announcement to the database. \n" + dbe.Message);
            }
            catch (Exception e)
            {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the announcement to the database. \n" + e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

}
