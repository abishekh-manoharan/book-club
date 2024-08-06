
using BookClubApi.Data;
using BookClubApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class AuthController : ControllerBase {
    private UserManager<ApplicationUser> userManager;
    private SignInManager<ApplicationUser> signInManager;
    private BookClubContext dbContext;
    

    public AuthController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext) {
        this.userManager = userManager;
        this.signInManager = signInManager;
        this.dbContext = dbContext;
    }

    // Action method that attempts to log in a user through email + password combination
    // On success, returns an IEnumerable object containing the "success" keyword and the user's ID.
    // On failure, returns an IEnumberable object of error codes
    [HttpPost("Login")]
    public async Task<IEnumerable<string>> Login(string email, string password) {
        // trying to find user with matching email
        ApplicationUser? user = await userManager.FindByEmailAsync(email);
        if(user != null){
            // attempting password sign in
            var result = await signInManager.PasswordSignInAsync(user!, password, true, false);
            // return success message + user id if sign in was successful
            if(result.Succeeded) {
                return ["succeeded", user.Id];
            }
        }
        // return error if user with email not found or if password sign in fails
        return ["error"];
    }

    // Action method that takes in user registration data then attempts to creates a user.
    // On success, returns an IEnumerable object containing the "success" keyword and the user's ID.
    // On failure, returns an IEnumberable object of error codes
    [HttpPost("Register")]
    public async Task<IEnumerable<string>> Register(User user, ApplicationUser appUser, string password) {
        var result = await userManager.CreateAsync(appUser, password);
        if(result.Succeeded) {            
            // Create User class with the associated AspNetUserId 
            user.AspnetusersId = appUser.Id;
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            // return success message + user id if registration was successful
            return ["succeeded", appUser.Id];
        }

        List<string> errors = new List<string>();
        foreach (var errs in result.Errors) {
            errors.Add(errs.Code);
        }
        return errors;
    }

    // Action method that returns the authentication status of the user 
    // If logged in, returns a boolean value of "true".
    // If not logged in, returns a boolean value of "false".
    [HttpGet("IsLoggedIn")]
    public ActionResult<bool> IsLoggedIn() {
        return signInManager.IsSignedIn(this.User);
    }

    [HttpPost("Logout")]
    public async void Logout() {
        await signInManager.SignOutAsync();
    }
}