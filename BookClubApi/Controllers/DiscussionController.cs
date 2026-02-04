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

    // action method that creates a thread for a reading instance. not applicable to replies to existing threads (see reply)
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateThread([FromBody] ThreadCreationValidationDTO thread)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure user has opted into reading
            Readinguser? readinguser = await clubService.GetReadinguser(User, (int)thread.ClubId!, (int)thread.BookId!);
            if (readinguser == null)
            {
                return Unauthorized("Reading user with the associated properties not found.");
            }

            // create thread
            try
            {
                var user = await authHelpers.GetUserClassOfLoggedInUser(User);

                Models.Thread newThread = new()
                {
                    ParentThreadId = null,
                    BookId = (int)thread.BookId!,
                    ClubId = (int)thread.ClubId!,
                    UserId = user!.UserId,
                    Text = thread.Text,
                    TimePosted = DateTime.UtcNow,
                    Deleted = false
                };

                dbContext.Threads.Add(newThread);
                dbContext.SaveChanges();

                NonDeletedThreadDTO newThreadDTO = new(newThread.ThreadId, newThread.ParentThreadId, newThread.BookId, newThread.ClubId, newThread.UserId, newThread.Text, newThread.TimePosted, newThread.Deleted);

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

    // action method that created a thread in reply to an existing thread
    [HttpPost("reply")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateReplyThread([FromBody] ThreadReplyCreationValidationDTO thread)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure user has opted into reading
            Readinguser? readinguser = await clubService.GetReadinguser(User, (int)thread.ClubId!, (int)thread.BookId!);
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
                    ParentThreadId = thread.ParentThreadId,
                    BookId = (int)thread.BookId!,
                    ClubId = (int)thread.ClubId!,
                    UserId = user!.UserId,
                    Text = thread.Text,
                    TimePosted = DateTime.UtcNow,
                    Deleted = false
                };

                dbContext.Threads.Add(newThread);
                dbContext.SaveChanges();

                NonDeletedThreadDTO newThreadDTO = new(newThread.ThreadId, newThread.ParentThreadId, newThread.BookId, newThread.ClubId, newThread.UserId, newThread.Text, newThread.TimePosted, newThread.Deleted);

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

    // action method to delete thread: deleting thread updates the deleted flag of a thread record to true
    [HttpDelete("delete")]
    [Authorize]
    public async Task<ActionResult<Reading>> DeleteThread([FromBody][Required] int threadId)
    {
        if (ModelState.IsValid)
        {
            Models.Thread? thread = dbContext.Threads.Where(thread => thread.ThreadId == threadId).FirstOrDefault();
            if (thread != null)
            {
                var adminStatus = await authHelpers.IsUserAdminOfClub(User, thread.ClubId);
                var loggedInUser = await authHelpers.GetUserClassOfLoggedInUser(User);
                int userId = loggedInUser!.UserId;

                // ensure logged in user is either admin of the club or the poster of the thread
                if (adminStatus == true || thread.UserId == userId)
                {
                    thread.Deleted = true;
                    dbContext.SaveChanges();
                    return Ok();
                }

                return Unauthorized("User is unauthorized to delete the thread. Ensure user is admin of the club or the poster of the thread.");
            }
            return NotFound("Thread wasn't found.");
        }
        return BadRequest(ModelState);
    }

    // action method that returns a list of threads for a reading
    // returns a list of objects that implement IThreadDTO - either ThreadDTO or ThreadDeletedDTO
    [HttpGet("getAllThreadsOfAReading")]
    public async Task<ActionResult<List<ThreadDTO>>> GetAllThreads([FromQuery] ReadingGetOneValDTO readingDTO)
    {
        if (ModelState.IsValid)
        {
            var clubPrivacy = clubService.IsClubPrivate((int)readingDTO.ClubId!);
            var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)readingDTO.ClubId);
            if (clubPrivacy == false || clubUser != null)
            { // case where club is public or if not, user is member of the club
                // ensure reading exists
                var reading = dbContext.Readings.Where(reading => reading.BookId == readingDTO.BookId && reading.ClubId == (int)readingDTO.ClubId).AsNoTracking().FirstOrDefault();
                if (reading != null)
                {
                    // get threads with associated with the reading
                    List<Models.Thread> threads = dbContext.Threads.Where(thread => thread.BookId == readingDTO.BookId && thread.ClubId == readingDTO.ClubId).AsNoTracking().ToList();

                    // create threads list with DTOs
                    List<ThreadDTO> listOfThreadDTOs = new() { };

                    foreach (Models.Thread thread in threads)
                    {
                        // create ThreadDeletedDTO for return list if the thread is deleted
                        ThreadDTO singleThreadDTO = new(thread.ThreadId, thread.ParentThreadId, thread.BookId, thread.ClubId, thread.UserId, thread.Text, thread.TimePosted, thread.Deleted);
                        listOfThreadDTOs.Add(singleThreadDTO);
                    }
                    // List<NonDeletedThreadDTO> listOfNonDeletedThreadsAsDTOs = new() { };
                    // List<DeletedThreadDTO> listOfDeletedThreadsAsDTOs = new() { };

                    // foreach (Models.Thread thread in threads)
                    // {
                    //     // create ThreadDeletedDTO for return list if the thread is deleted
                    //     if (thread.Deleted)
                    //     {
                    //         DeletedThreadDTO threadDeletedDTO = new(thread.ThreadId, thread.ParentThreadId, thread.BookId, thread.ClubId, thread.TimePosted, thread.Deleted);
                    //         listOfDeletedThreadsAsDTOs.Add(threadDeletedDTO);
                    //     }
                    //     else
                    //     {
                    //         // create ThreadDTO for return list if the thread is deleted
                    //         NonDeletedThreadDTO threadNonDeletedDTO = new(thread.ThreadId, thread.ParentThreadId, thread.BookId, thread.ClubId, thread.UserId, thread.Text, thread.TimePosted, thread.Deleted);
                    //         listOfNonDeletedThreadsAsDTOs.Add(threadNonDeletedDTO);
                    //     }
                    // }

                    return Ok(listOfThreadDTOs);
                }
                return NotFound("Reading doesn't exist.");
            }
            return Unauthorized("User must be member of a private club to view it's threads.");
        }
        return BadRequest(ModelState);
    }
}
