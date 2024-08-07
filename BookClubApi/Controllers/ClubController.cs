using BookClubApi.Data;
using BookClubApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class ClubController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;

    public ClubController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
    }

    // Action method that takes in new club instance's data and creates a club record and clubuser record using new club's ID and logged in user's ID as Composite PK
    [HttpPost("create")]
    public string CreateClub(Club club) {
        
        // create club record and saving it to the DB
        dbContext.Clubs.Add(club);
        dbContext.SaveChanges(); // will populate the club object's ID field

        // find user object associated with AspNetUserId
        var user = dbContext.Users
            .Where(u => u.AspnetusersId == userManager.GetUserId(User))
            .First();

        // create ClubUser object with the current user's ID, created club's ID, admin as true
        ClubUser clubUser = new ClubUser {
            UserId = user.UserId,
            ClubId = club.ClubId,
            Admin = true
        };

        dbContext.ClubUsers.Add(clubUser);
        dbContext.SaveChanges();

        string returnObj =  club.Name + " " + club.Description + " " + club.ProfileImg + " " + club.ClubId + "\n" + user.AspnetusersId + " " + user.UserId + " " + userManager.GetUserId(User) + "\n" + clubUser.ClubId + " " + clubUser.UserId + " " + clubUser.Admin;
        return returnObj;

        
    }

}