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

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class DiscussionController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;
    public DiscussionController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelper, IClubService clubService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelper;
        this.clubService = clubService;
    }

    // action method that creates a thread for a reading instance. not applicable to replies to existing threads (see )
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateThread(ThreadCreationValidationDTO thread)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure user has opted into reading
            Readinguser? readinguser = await clubService.GetReadinguser(User, (int) thread.ClubId!, (int) thread.BookId!);
            if (readinguser == null)
            {
                return Unauthorized("User isn't authorized to create a thread for this reading. Ensure user has opted into the reading.");
            }

            // create thread
            try
            {
                var user = await authHelpers.GetUserClassOfLoggedInUser(User);
                
                Models.Thread newThread = new()
                {
                    ParentThreadId = null, 
                    BookId = (int) thread.BookId!,
                    ClubId = (int) thread.ClubId!,
                    UserId = user!.UserId,
                    Text = thread.Text,
                    TimePosted = DateTime.Now,
                    Deleted = false
                };

                dbContext.Threads.Add(newThread);
                dbContext.SaveChanges();

                ThreadDTO newThreadDTO = new()
                {
                    ThreadId = newThread.ThreadId,
                    BookId = newThread.BookId,
                    ClubId = newThread.ClubId,
                    UserId = newThread.UserId,
                    TimePosted = newThread.TimePosted,
                    Text = newThread.Text,
                    Deleted = newThread.Deleted
                };

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

