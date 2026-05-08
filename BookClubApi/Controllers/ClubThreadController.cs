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

            bool pinned;
            bool announcement;

            // ensuring that if the user isn't admin, that pinned and announcement properties are always false
            if(clubUser.Admin == true) {
                pinned = (bool) thread.Pinned!;
                announcement = (bool) thread.Announcement!;
            } else
            {
                pinned = false;
                announcement = false;
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
                    Pinned = pinned,
                    Announcement = announcement
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


    // action method that returns a batch of threads for a reading 
    [HttpGet("getThreadBatch")]
    public async Task<ActionResult<List<ThreadDTO>>> GetThreadBatch([FromQuery] ClubThreadCursorValDTO c)
    {
        if (ModelState.IsValid)
        {
            var clubPrivacy = clubService.IsClubPrivate((int)c.ClubId!);
            var clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, (int)c.ClubId);
            if (clubPrivacy != null)
            {
                // case where club is public or if not, user is member of the club
                if (clubPrivacy == false || clubUser != null)
                {

                    var query = dbContext.ClubThreads
                        .Where(t => t.ClubId == c.ClubId)
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
                            FROM Club_Thread t
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
                                child.club_id,
                                child.user_id,
                                child.Text,
                                child.Heading,
                                child.Pinned,         
                                child.Deleted,        
                                child.time_posted,
                                parent.depth + 1 AS depth
                            FROM (
                                SELECT
                                    t.*,
                                    ROW_NUMBER() OVER (
                                        PARTITION BY t.parent_thread_id
                                        ORDER BY t.time_posted DESC, t.thread_id DESC
                                    ) AS rn
                                FROM club_thread t
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

                    var children = await dbContext.ClubThreads
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
                return Unauthorized("User must be member of a private club to view it's threads.");
            }
            return NotFound("Club not found.");
        }
        return BadRequest(ModelState);
    }
}

