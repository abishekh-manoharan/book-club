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
            // ensure user is a club member of the club associated with the thread being created
            var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)thread.ClubId!);

            if (clubUser == null)
            {
                return Unauthorized("User isn't authorized to create a thread for this club.");
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
            var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)thread.ClubId!);

            if (clubUser == null)
            {
                return Unauthorized("User isn't authorized to create a thread for this club. Ensure they are a club member.");
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
    [Authorize]
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

    // action method that returns a batch of threads for a reading 
    [HttpGet("getThreadBatch")]
    [Authorize]
    public async Task<ActionResult<List<ThreadDTO>>> GetThreadBatch([FromQuery] ThreadCursorValDTO c)
    {
        if (ModelState.IsValid)
        {
            var query = dbContext.Threads
                .Where(t => t.ClubId == c.ClubId && t.BookId == c.BookId)
                .Where(t => t.ParentThreadId == c.ParentThreadId);

            // case for initial batch grab
            if (c.CursorTimeAgo == new DateTime(2000, 1, 1, 5, 0, 0, DateTimeKind.Utc))
            {
                query = query.Where(t =>
                    t.TimePosted > c.CursorTimeAgo ||
                    (t.TimePosted == c.CursorTimeAgo && t.ThreadId > c.CursorThreadId));
            }
            else // case for remaining batch grabs
            {
                query = query.Where(t =>
                    t.TimePosted < c.CursorTimeAgo ||
                    (t.TimePosted == c.CursorTimeAgo && t.ThreadId < c.CursorThreadId));
            }

            var roots = await query
                .OrderByDescending(t => t.TimePosted)
                .ThenByDescending(t => t.ThreadId)
                .Take(21)
                .AsNoTracking()
                .ToListAsync();


            var rootIds = roots.Select(r => r.ThreadId).ToList();
            var sql = """
            WITH RECURSIVE thread_tree AS (
                SELECT
                    t.*,
                    0 AS depth
                FROM Thread t
                WHERE t.thread_id IN (
                    SELECT jt.thread_id
                    FROM JSON_TABLE(
                        @rootIds,
                        '$[*]' COLUMNS (
                            thread_id BIGINT PATH '$'
                        )
                    ) jt
                )

                UNION ALL

                -- Recursive step
                SELECT
                    child.thread_id,
                    child.parent_thread_id,
                    child.book_id,
                    child.club_id,
                    child.user_id,
                    child.time_posted,
                    child.Text,         
                    child.Deleted,        
                    parent.depth + 1 AS depth
                FROM (
                    SELECT
                        t.*,
                        ROW_NUMBER() OVER (
                            PARTITION BY t.parent_thread_id
                            ORDER BY t.time_posted DESC, t.thread_id DESC
                        ) AS rn
                    FROM Thread t
                ) child
                JOIN thread_tree parent
                    ON child.parent_thread_id = parent.thread_id
                WHERE
                    child.rn <= 3
                    AND parent.depth < 4
            )

            SELECT *
            FROM thread_tree;
            ORDER BY time_posted ASC, thread_id ASC;
            """;

            var children = await dbContext.Threads
                .FromSqlRaw(sql, new MySqlParameter("@rootIds", JsonSerializer.Serialize(rootIds)))
                .AsNoTracking()
                .ToListAsync();

            var allThreads = roots
                .Concat(children)
                // .OrderByDescending(t => t.TimePosted)
                // .ThenByDescending(t => t.ThreadId)
                .ToList();

            foreach (var thread in allThreads)
            {
                thread.Text = thread.Deleted ? "This thread has been deleted." : thread.Text;
            }
            
            return Ok(allThreads);
        }
        return BadRequest(ModelState);
    }
}
