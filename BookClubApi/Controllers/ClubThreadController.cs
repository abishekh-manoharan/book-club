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
public class ClubThreadController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;
    public ClubThreadController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelper, IClubService clubService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelper;
        this.clubService = clubService;
    }

    // action method that creates a thread for a reading instance. not applicable to replies to existing threads (see reply)
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<ClubThreadDTO>> CreateClubThread([FromBody] ClubThreadCreationValDTO thread)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure user is a club member of the club associated with the thread being created
            var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)thread.ClubId!);

            if (clubUser == null || clubUser.Admin == false)
            {
                return Unauthorized("User isn't authorized to create a thread for this club.");
            }

            // create thread
            try
            {
                var user = await authHelpers.GetUserClassOfLoggedInUser(User);

                ClubThread newClubThread = new()
                {
                    ParentThreadId = null,
                    ClubId = (int)thread.ClubId!,
                    UserId = user!.UserId,
                    Text = thread.Text,
                    Heading = thread.Heading,
                    TimePosted = DateTime.UtcNow,
                    Deleted = false,
                    Pinned = thread.Pinned,
                    Announcement = thread.Announcement,
                };

                dbContext.ClubThreads.Add(newClubThread);
                dbContext.SaveChanges();

                ClubThreadDTO newThreadDTO = new(
                    newClubThread.ThreadId,
                    newClubThread.ParentThreadId,
                    newClubThread.ClubId,
                    newClubThread.UserId,
                    newClubThread.Text,
                    newClubThread.Heading,
                    newClubThread.Pinned,
                    newClubThread.Deleted,
                    newClubThread.Announcement,
                    newClubThread.TimePosted);

                return Ok(newThreadDTO);
            }
            catch (DbUpdateException dbe)
            {
                // if reading exists already, return 409 conflict status
                if (dbe.InnerException!.Message.Contains("Duplicate"))
                {
                    return Conflict("Club thread already exists.");
                }
                else if (dbe.InnerException!.Message.Contains("foreign key constraint fails"))
                {
                    return BadRequest("FK constraint violated. Ensure reading is valid.");
                }

                return StatusCode(500, "Error saving the club Thread to the database. \n" + dbe.Message);
            }
            catch (Exception e)
            {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the club Thread to the database. \n" + e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that created a thread in reply to an existing thread
    [HttpPost("reply")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateReplyClubThread([FromBody] ClubThreadReplyValDTO thread)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure user has opted into reading
            var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)thread.ClubId!);

            if (clubUser == null)
            {
                return Unauthorized("User isn't authorized to create a thread for this club. Ensure they are a club member.");
            }

            // create thread
            try
            {
                var user = await authHelpers.GetUserClassOfLoggedInUser(User);

                ClubThread newThread = new()
                {
                    ParentThreadId = thread.ParentThreadId,
                    ClubId = (int)thread.ClubId!,
                    UserId = user!.UserId,
                    Text = thread.Text,
                    Heading = null, // replies are never going to contain headings
                    Pinned = false, // replies can never be pinned
                    Deleted = false, // replies will never be deleted on post
                    Announcement = false, // replies are never going to be announcements
                    TimePosted = DateTime.UtcNow,
                };

                dbContext.ClubThreads.Add(newThread);
                dbContext.SaveChanges();

                ClubThreadDTO newThreadDTO = new(
                    newThread.ThreadId,
                    newThread.ParentThreadId,
                    newThread.ClubId,
                    newThread.UserId,
                    newThread.Text,
                    newThread.Heading,
                    newThread.Pinned,
                    newThread.Deleted,
                    newThread.Announcement,
                    newThread.TimePosted);

                return Ok(newThreadDTO);
            }
            catch (DbUpdateException dbe)
            {
                // if reading exists already, return 409 conflict status
                if (dbe.InnerException!.Message.Contains("Duplicate"))
                {
                    return Conflict("Thread already exists.");
                }
                else if (dbe.InnerException!.Message.Contains("foreign key constraint fails"))
                {
                    return BadRequest("FK constraint violated. Ensure thread being replied to exists.");
                }

                return StatusCode(500, "Error saving the thread to the database. \n" + dbe.Message);
            }
            catch (Exception e)
            {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the thread to the database. \n" + e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

}
