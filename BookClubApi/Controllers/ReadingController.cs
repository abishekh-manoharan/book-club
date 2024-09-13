using System.ComponentModel.DataAnnotations;
using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using BookClubApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class ReadingController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;

    public ReadingController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelper)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelper;
    }

    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateReading([Required] int clubId, Book book)
    // public async Task<ActionResult<Reading>> CreateReading(Book book, [Required] int clubId, string name, string description)
    {
        // ensure required params are included
        // if (ModelState.IsValid && _clubId != null && name != null)
        if (ModelState.IsValid)
        {
            // ensure logged in user is the club's admin
            bool? admin = await authHelpers.IsUserAdminOfClub(User, clubId);
            if(admin == null || admin == false) {
                return Unauthorized("User isn't authorized to create a reading for this club.");
            }

            // save book to db if it doesn't exist already
            

            // create reading
            // if reading exists already, 
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }
}