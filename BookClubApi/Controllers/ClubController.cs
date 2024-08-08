using BookClubApi.Data;
using BookClubApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;

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
    public Club CreateClub(Club club) {
        
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

        return club;
        // string returnObj =  club.Name + " " + club.Description + " " + club.ProfileImg + " " + club.ClubId + "\n" + user.AspnetusersId + " " + user.UserId + " " + userManager.GetUserId(User) + "\n" + clubUser.ClubId + " " + clubUser.UserId + " " + clubUser.Admin;
        // return returnObj;
    }

    // action method that takes in an existing club's updated details and persists them in the DB
    [HttpPut("update")]
    public ActionResult PatchClub(Club club){
        // checking if club exists in DB
        var matchingClub = dbContext.Clubs
            .Where(c => c.ClubId == club.ClubId);

        if(matchingClub.AsNoTracking().ToList().IsNullOrEmpty()) {  // ensuring that we don't track the result of the query so there is no PK interference 
            return NotFound();  // return not found if club with the specified Id isn't found
        }
        
        dbContext.Clubs.Update(club); // update club
        dbContext.SaveChanges();

        return Ok(club); // return updated club with status 200 if club with specified Id found
    }


}