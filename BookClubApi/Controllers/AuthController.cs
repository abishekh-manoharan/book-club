
using System.ComponentModel.DataAnnotations;
using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class AuthController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private SignInManager<ApplicationUser> signInManager;
    private BookClubContext dbContext;


    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext)
    {
        this.userManager = userManager;
        this.signInManager = signInManager;
        this.dbContext = dbContext;
    }

    // Action method that attempts to log in a user through email + password combination
    // On success, returns an IEnumerable object containing the "success" keyword and the user's ID.
    // On failure, returns an IEnumberable object of error codes
    [HttpPost("Login")]
    public async Task<ActionResult<List<string>>> Login(string email, string password)
    {
        if (ModelState.IsValid)
        {
            // trying to find user with matching email
            ApplicationUser? user = await userManager.FindByEmailAsync(email);
            if (user != null)
            {
                // attempting password sign in
                var result = await signInManager.PasswordSignInAsync(user!, password, true, false);
                // return success message + user id if sign in was successful
                if (result.Succeeded)
                {
                    return Ok(new List<string> { "succeeded", user.Id });
                }
            }
            // return error if user with email not found or if password sign in fails
            return BadRequest(new List<string> { "error" });
        }
        return BadRequest(ModelState);
    }

    // Action method that takes in user registration data then attempts to creates a user.
    // On success, returns an IEnumerable object containing the "success" keyword and the user's ID.
    // On failure, returns an IEnumberable object of error codes
    [HttpPost("Register")]
    public async Task<ActionResult<List<string>>> Register(User user, ApplicationUser appUser, string password)
    {
        if (ModelState.IsValid)
        {
            var result = await userManager.CreateAsync(appUser, password);
            if (result.Succeeded)
            {
                // Create User class with the associated AspNetUserId 
                user.AspnetusersId = appUser.Id;
                dbContext.Users.Add(user);
                dbContext.SaveChanges();
                // return success message + user id if registration was successful
                return Ok(new List<string> { "succeeded", appUser.Id });
            }

            List<string> errors = new List<string>();
            foreach (var errs in result.Errors)
            {
                errors.Add(errs.Code);
            }
            return BadRequest(errors);
        }
        return BadRequest(ModelState);
    }

    // action method used to update a user's password
    [HttpPut("updatePassword")]
    [Authorize]
    public async Task<ActionResult<List<string>>> UpdatePassword([Required] string password)
    {
        if (ModelState.IsValid)
        {
            var user = await userManager.GetUserAsync(User);
            var token = await userManager.GeneratePasswordResetTokenAsync(user!);
            var result = await userManager.ResetPasswordAsync(user!, token, password);

            if (result.Succeeded)
            {
                // return success message + user id if registration was successful
                return Ok(new List<string> { "succeeded", user!.Id });
            }

            List<string> errors = [];
            foreach (var errs in result.Errors)
            {
                errors.Add(errs.Code);
            }
            return BadRequest(errors);
        }
        return BadRequest(ModelState);
    }

    // Action method that returns the authentication status of the user 
    // If logged in, returns a boolean value of "true".
    // If not logged in, returns a boolean value of "false".
    [HttpGet("IsLoggedIn")]
    public ActionResult<bool> IsLoggedIn()
    {
        return Ok(signInManager.IsSignedIn(this.User));
    }

    // Action method that logs the user out, if they are logged in
    [HttpPost("Logout")]
    public async void Logout()
    {
        await signInManager.SignOutAsync();
    }

    // Action method that deletes a user's account
    [HttpDelete("deleteAccount")]
    [Authorize]
    public async Task<ActionResult<List<string>>> DeleteAccount()
    {
        ApplicationUser? user = await userManager.GetUserAsync(User);
        if (user != null)
        {
            var result = await userManager.DeleteAsync(user!);

            if (result.Succeeded)
            {
                // return success message + user id if registration was successful
                return Ok(new List<string> { "succeeded", user!.Id });
            }

            List<string> errors = [];
            foreach (var errs in result.Errors)
            {
                errors.Add(errs.Code);
            }
            return BadRequest(errors);
        }
        return BadRequest("User not found.");
    }

    // Action method that returns the authenticated user's AspNetUserId
    [HttpGet("AspNetUserID")]
    [Authorize]
    public string GetAspNetUserID()
    {
        return userManager.GetUserId(User)!;
    }

    // Action method that returns the authenticated user's UserId
    [HttpGet("UserID")]
    [Authorize]
    public int GetUserID()
    {
        var user = dbContext.Users
            .Where(u => u.AspnetusersId == userManager.GetUserId(User))
            .First();

        return user.UserId;
    }

}