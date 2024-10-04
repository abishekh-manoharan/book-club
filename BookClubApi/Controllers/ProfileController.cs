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
public class ProfileController : ControllerBase
{

    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;

    public ProfileController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers, IClubService clubService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
        this.clubService = clubService;
    }

    // action method to update the user's information: fname, lname, bio, profileimg
    [HttpPut("update")]
    public async Task<ActionResult<UserDTO>> Update(ProfileUpdateDTO updatedProfile) {
        // retrieve associated User class
        User? user = await authHelpers.GetUserClassOfLoggedInUser(User);

        if(user != null) {
            // update user instance's properties to request specifications
            user.Bio = updatedProfile.Bio;
            user.FName = updatedProfile.FName;
            user.LName = updatedProfile.LName;
            user.ProfileImg = updatedProfile.ProfileImg;

            dbContext.Users.Update(user); 
            dbContext.SaveChanges();

            UserDTO userDTO = new(user.UserId, user.Bio, user.FName, user.LName, user.ProfileImg, user.AspnetusersId);
            return Ok(userDTO);
        }
        return BadRequest("User instance associated with AspNetUser class not found.");
    }
    
}