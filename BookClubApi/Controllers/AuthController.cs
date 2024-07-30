
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
    [HttpPost("Register")]
    public async Task<string> Register(User user, ApplicationUser appUser, string password) {
        var result = await userManager.CreateAsync(appUser, password);
        if(result.Succeeded) {            
            // Create User class with the associated AspNetUserId 
            user.AspnetusersId = appUser.Id;
            dbContext.Users.Add(user);
            dbContext.SaveChanges();
            return appUser.Id;
        }

        string errors = "";
        foreach (var errs in result.Errors) {
            errors += errs.Description + "\n";
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