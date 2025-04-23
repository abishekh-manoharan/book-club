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
    public async Task<ActionResult<UserDTO>> GetAllNotifications()
    {
        User? user = await authHelpers.GetUserClassOfLoggedInUser(User);
        if (user != null)
        {
            var notifications = dbContext.Notification.Where(n => n.UserId == user.UserId).AsNoTracking();
            List<NotificationDTO> notificationDTOs = [];
            
            foreach (var n in notifications){
                NotificationDTO notificationDTO = new(n.NotificationId, n.UserId, n.Text, n.Time, n.Link);
                notificationDTOs.Add(notificationDTO);
            }

            return Ok(notificationDTOs);
        }
        return BadRequest("User instance associated with AspNetUser class not found.");
    }
}