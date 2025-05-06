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
[Authorize]
public class NotificationController : ControllerBase
{

    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;
    private IBookService bookService;

    public NotificationController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers, IClubService clubService, IBookService bookService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
        this.clubService = clubService;
        this.bookService = bookService;
    }

    // action method to get all of the logged in user's notifications
    [HttpGet("notifications")]
    [Authorize]
    public async Task<ActionResult<List<NotificationDTO>>> GetAllNotifications()
    {
        User? user = await authHelpers.GetUserClassOfLoggedInUser(User);
        if (user != null)
        {
            var notifications = dbContext.Notification.Where(n => n.UserId == user.UserId).AsNoTracking();
            List<NotificationDTO> notificationDTOs = [];

            foreach (var n in notifications)
            {
                NotificationDTO notificationDTO = new(n.NotificationId, n.UserId, n.Text, n.Time, n.Read, n.Link);
                notificationDTOs.Add(notificationDTO);
            }

            return Ok(notificationDTOs);
        }
        return BadRequest("User instance associated with AspNetUser class not found.");
    }

    // action method to create a notification record for a single user
    [HttpPost("notificationForSingleUser")]
    [Authorize]
    public ActionResult<NotificationDTO> CreateNotificationForSingleUser([FromBody] CreateNotificationSingleUserValDTO notification)
    {
        if (ModelState.IsValid)
        {
            try
            {
                Notification newNotification = new()
                {
                    UserId = (int)notification.UserId!,
                    Text = notification.Text,
                    Link = notification.Link,
                    Time = DateTime.UtcNow,
                    Read = false
                };

                dbContext.Notification.Add(newNotification);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (DbUpdateException dbe)
            {
                string InnerException = dbe.InnerException!.Message ?? dbe.Message;
                // if reading exists already, return 409 conflict status
                if (InnerException.Contains("Duplicate", StringComparison.OrdinalIgnoreCase))
                {
                    return Conflict("Notification already exists.");
                }
                else if (InnerException.Contains("foreign key", StringComparison.OrdinalIgnoreCase))
                {
                    return NotFound("User not found with the associated id.");
                }
                else
                {
                    return BadRequest(dbe.InnerException!.Message);
                }
            }
            catch (Exception e)
            {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the notification to the database. \n" + e.Message);
            }

        }
        return BadRequest(ModelState);
    }

    // action method to create notification records for all club members
    [HttpPost("notificationForClubMembers")]
    [Authorize]
    public async Task<ActionResult<NotificationDTO>> CreateNotificationForClubMembers([FromBody] CreateNotificationClubMembersValDTO notification)
    {
        if (ModelState.IsValid)
        {
            // get all club users in the club
            var clubUsers = await dbContext.ClubUsers.Where(cu => cu.ClubId == notification.ClubId).AsNoTracking().ToListAsync();
            if (!clubUsers.IsNullOrEmpty())
            {
                // create a notification for each club member
                var notifications = clubUsers.Select(cu => new Notification
                {
                    UserId = cu.UserId,
                    Text = notification.Text,
                    Link = notification.Link,
                    Time = DateTime.UtcNow,
                    Read = false
                }).ToList();


                try
                {
                    await dbContext.AddRangeAsync(notifications);
                    await dbContext.SaveChangesAsync();
                    return Ok();
                }
                catch (DbUpdateException dbe)
                {
                    string InnerException = dbe.InnerException!.Message ?? dbe.Message;
                    // if reading exists already, return 409 conflict status
                    if (InnerException.Contains("Duplicate", StringComparison.OrdinalIgnoreCase))
                    {
                        return Conflict("Notification already exists.");
                    }
                    else if (InnerException.Contains("foreign key", StringComparison.OrdinalIgnoreCase))
                    {
                        return NotFound("User not found with the associated id.");
                    }
                    else
                    {
                        return BadRequest(dbe.InnerException!.Message);
                    }
                }
                catch (Exception e)
                {
                    // handling all other errors when trying to save to db
                    return StatusCode(500, "Error saving the notification to the database. \n" + e.Message);
                }
            }

            return NotFound("No club users found with the associated clubid.");
        }
        return BadRequest(ModelState);
    }

    // action method to create notification records for all reading members
    [HttpPost("notificationForReadingMembers")]
    [Authorize]
    public async Task<ActionResult<NotificationDTO>> CreateNotificationForReadingMembers([FromBody] CreateNotificationReadingUsersValDTO notification)
    {
        if (ModelState.IsValid)
        {
            // get all club users in the club
            var readingUsers = await dbContext.Readingusers
                .Where(ru => ru.ClubId == notification.ClubId && ru.BookId == notification.BookId)
                .AsNoTracking()
                .ToListAsync();
            
            if (!readingUsers.IsNullOrEmpty())
            {
                // create a notification for each club member
                var notifications = readingUsers.Select(ru => new Notification
                {
                    UserId = ru.UserId,
                    Text = notification.Text,
                    Link = notification.Link,
                    Time = DateTime.UtcNow,
                    Read = false
                }).ToList();

                try
                {
                    await dbContext.AddRangeAsync(notifications);
                    await dbContext.SaveChangesAsync();
                    return Ok();
                }
                catch (DbUpdateException dbe)
                {
                    string InnerException = dbe.InnerException!.Message ?? dbe.Message;
                    // if reading exists already, return 409 conflict status
                    if (InnerException.Contains("Duplicate", StringComparison.OrdinalIgnoreCase))
                    {
                        return Conflict("Notification already exists.");
                    }
                    else if (InnerException.Contains("foreign key", StringComparison.OrdinalIgnoreCase))
                    {
                        return NotFound("Book or club not found with the associated id.");
                    }
                    else
                    {
                        return BadRequest(dbe.InnerException!.Message);
                    }
                }
                catch (Exception e)
                {
                    // handling all other errors when trying to save to db
                    return StatusCode(500, "Error saving the notification to the database. \n" + e.Message);
                }
            }

            return NotFound("No reading users found with the associated reading.");
        }
        return BadRequest(ModelState);
    }

    [HttpPut("notificationsAsRead")]
    [Authorize]
    public ActionResult<int[]> UpdateNotificationsAsRead([FromBody] int[] notifications){
    // public async Task<ActionResult<bool>> UpdateNotificationsAsRead([FromBody] int[] notifications){
        return notifications;
    }
}

