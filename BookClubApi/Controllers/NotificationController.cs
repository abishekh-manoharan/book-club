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
                NotificationDTO notificationDTO = new(n.NotificationId, n.UserId, n.Text, n.Time, n.Link);
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
                    Time = (DateTime)notification.Time!,
                };

                dbContext.Notification.Add(newNotification);
                dbContext.SaveChanges();

                return Ok();
            }
            catch (DbUpdateException dbe)
            {
                // if reading exists already, return 409 conflict status
                if (dbe.InnerException!.Message.Contains("Duplicate"))
                {
                    return Conflict("Notification already exists.");
                }
                else if (dbe.InnerException!.Message.Contains("foreign key"))
                {
                    return NotFound("User not found with the associated id.");
                } else {
                    return BadRequest(dbe.InnerException!.Message);
                }
            }
            catch (Exception e)
            {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
            }

        }
        return BadRequest(ModelState);
    }
    // action method to create notification records for all club members

    // action method to create notification records for all reading members
}

