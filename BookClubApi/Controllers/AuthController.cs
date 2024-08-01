
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

    // [HttpGet("users")]
    // public IEnumerable<ApplicationUser> Get() { 

    // }
/*

*/

    // Action method that attempts to log in a user through email + password combination
    // On success, returns an IEnumerable object containing the "success" keyword and the user's ID.
    // On failure, returns an IEnumberable object of error codes
    [HttpPost("Login")]
    public IEnumerable<string> Login(string email, string password) {
        return [email, password];
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
            return ["succeeded", appUser.Id];
        }

        List<string> errors = new List<string>();
        foreach (var errs in result.Errors) {
            errors.Add(errs.Code);
        }
        return errors;
    }

    [HttpGet("Users")]
    public List<User> GetAllUsers(){
        return dbContext.Users.ToList<User>();
    }
    // [HttpGet]
    // public string GetBody(User user, ApplicationUser appUser, string password)  {
    //     return "Fname " + user.FName + " Lname " + user.LName + " AppUsername " + appUser.UserName+ " AppEmail " + appUser.Email+ " AppPhoneNumber " + appUser.PhoneNumber+ " AppUsername " + appUser.UserName;

    // }
}