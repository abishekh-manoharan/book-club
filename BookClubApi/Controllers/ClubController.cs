using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Mysqlx.Notice;

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

    // Action method that returns a club record based on ClubID
    // returns a ClubDTO object if club is found with status 200
    // returns null otherwise with status 404
    [HttpGet("getOneClub")]
    public ActionResult<ClubDTO> GetOneClub(int ClubId)
    {
        Club? club = dbContext.Clubs
            .Where(club => club.ClubId == ClubId)
            .AsNoTracking()
            .FirstOrDefault();

        if (club != null)
        {
            ClubDTO clubDTO = new(club.ClubId, club.Name, club.Description, club.ProfileImg);
            return Ok(clubDTO);
        }

        return NotFound(null);
    }

    // Action method that takes in new club instance's data and creates a club record and clubuser record using new club's ID and logged in user's ID as Composite PK
    [HttpPost("create")]
    public ActionResult<ClubDTO> CreateClub(Club club)
    {
        // ensure ClubId is 0 so that a new Id will be generated on add
        club.ClubId = 0;

        // create club record and saving it to the DB
        dbContext.Clubs.Add(club);
        dbContext.SaveChanges(); // will populate the club object's ID field

        // find user object associated with AspNetUserId
        var user = dbContext.Users
            .Where(u => u.AspnetusersId == userManager.GetUserId(User))
            .First();

        // create ClubUser object with the current user's ID, created club's ID, admin as true
        ClubUser clubUser = new ClubUser
        {
            UserId = user.UserId,
            ClubId = club.ClubId,
            Admin = true
        };

        dbContext.ClubUsers.Add(clubUser);
        dbContext.SaveChanges();

        // return created club DTO object
        ClubDTO createdClub = new(club.ClubId, club.Name, club.Description, club.ProfileImg);
        return createdClub;
        // string returnObj =  club.Name + " " + club.Description + " " + club.ProfileImg + " " + club.ClubId + "\n" + user.AspnetusersId + " " + user.UserId + " " + userManager.GetUserId(User) + "\n" + clubUser.ClubId + " " + clubUser.UserId + " " + clubUser.Admin;
        // return returnObj;
    }

    // action method that takes in an existing club's updated details and persists them in the DB
    [HttpPut("update")]
    public ActionResult UpdateClub(Club club)
    {
        // checking if club exists in DB
        var matchingClub = dbContext.Clubs
            .Where(c => c.ClubId == club.ClubId);

        if (matchingClub.AsNoTracking().ToList().IsNullOrEmpty())
        {  // ensuring that we don't track the result of the query so there is no PK interference 
            return NotFound();  // return not found if club with the specified Id isn't found
        }

        dbContext.Clubs.Update(club); // update club
        dbContext.SaveChanges();

        return Ok(club); // return updated club with status 200 if club with specified Id found
    }

    // action method that deletes the specified club using the clubId
    // returns true if operations successful
    // returns false if operations failed
    [HttpDelete("delete")]
    public ActionResult<bool> DeleteClub(int ClubId)
    {
        var result = dbContext.Clubs
            .Where(club => club.ClubId == ClubId)
            .AsNoTracking()
            .FirstOrDefault();

        if (result != null)
        {
            dbContext.Clubs.Remove(result);
            dbContext.SaveChanges();
            return Ok(true);
        }

        return NotFound(false);
    }

    // TODO: RETURN DTO
    // this action method gets and returns all the clubs that are associated with the logged in user
    [HttpGet("joinedClubs")]
    public ActionResult<List<ClubDTO>> GetJoinedClubs()
    {
        // getting logged in user's User class ID
        var user = dbContext.Users
            .Where(user => user.AspnetusersId == userManager.GetUserId(User))
            .AsNoTracking()
            .First();

        // getting all ClubUser objects where the user id matches the id of the logged in user
        var clubUsers = dbContext.ClubUsers
            .Where(clubUser => clubUser.UserId == user.UserId)
            .ToList();

        // forming a list of all associated club objects associated with the previously attained clubUser objects
        List<ClubDTO> clubs = new List<ClubDTO>();
        foreach (ClubUser clubUser in clubUsers)
        {
            Club foundClub = dbContext.Clubs
                .Where(club => club.ClubId == clubUser.ClubId)
                .AsNoTracking()
                .First();
            
            // map found clubs to DTOP
            ClubDTO foundClubDTO = new(foundClub.ClubId, foundClub.Name, foundClub.Description, foundClub.ProfileImg);

            clubs.Add(foundClubDTO);
        }

        // returning retrieved clubs from 
        return Ok(clubs);

    }

    // action method joins a user to a club
    // returns true if join is successful
    // returns false if join is failed
    [HttpPost("join")]
    public ActionResult<bool> JoinClub(int UserId, int ClubId)
    {
        // TODO check if the signed in user is authorized to allow club join by ensuring the logged in user's ClubUser record wiht the associated ClubId has Admin = true
        // return not authorized otherwise

        // ensure club and user exists
        User? user = dbContext.Users
            .Where(user => user.UserId == UserId)
            .AsNoTracking()
            .FirstOrDefault();
        Club? club = dbContext.Clubs
            .Where(club => club.ClubId == ClubId)
            .AsNoTracking()
            .FirstOrDefault();

        // case where both user and club exist
        if (club != null && user != null)
        {
            // creating a club user to join the user to the club
            ClubUser newClubUser = new()
            {
                ClubId = club.ClubId,
                UserId = user.UserId,
                Admin = false   // new users are not admins by default
            };

            try
            {
                dbContext.ClubUsers.Add(newClubUser);
                dbContext.SaveChanges();
            }
            catch (DbUpdateException)
            {
                // case where the user is already in the club - ClubUser with the UserId and ClubId already exists
                return StatusCode(409, false);
            }
            catch
            {
                // all other error cases
                return StatusCode(400, false);
            }
            return Ok(true);
        }

        // case where either club or user doesn't exist in DB
        return NotFound(false);
    }

    // action method that remove a user from a club
    [HttpPost("leave")]
    public ActionResult<bool> LeaveClub(int UserId, int ClubId)
    {
        // ensure club and user exists
        User? user = dbContext.Users
            .Where(user => user.UserId == UserId)
            .AsNoTracking()
            .FirstOrDefault();
        Club? club = dbContext.Clubs
            .Where(club => club.ClubId == ClubId)
            .AsNoTracking()
            .FirstOrDefault();

        // case where both user and club exist
        if (club != null && user != null)
        {
            // ensure clubUser exists
            var clubUser = dbContext.ClubUsers
                .Where(clubUser => clubUser.ClubId == ClubId && clubUser.UserId == UserId)
                .AsNoTracking()
                .FirstOrDefault();

            if (clubUser != null)
            {
                dbContext.ClubUsers.Remove(clubUser);
                dbContext.SaveChanges();

                return Ok(true);
            }
        }

        // case where either club or user or clubuser doesn't exist in DB
        return NotFound(false);
    }

    // TODO: RETURN DTO
    // Action methods that returns all users who have joined the specified club
    // takes in ClubId as agument
    // returns a list of User objects
    [HttpGet("clubUsers")]
    public ActionResult<List<User>> GetUsersOfAClub(int ClubId)
    {
        // getting all club users where the ClubId matches the argument
        var clubUsers = dbContext.ClubUsers
            .Where(clubUser => clubUser.ClubId == ClubId)
            .AsNoTracking()
            .ToList();

        // filling empty users list with users in the club
        List<User> users = new List<User>();
        foreach (var clubUser in clubUsers)
        {
            var user = dbContext.Users
                .Where(user => user.UserId == clubUser.UserId)
                .AsNoTracking()
                .First();
            users.Add(user);
        }

        return users;
    }

    // action method that sets the given clubuser's admin state to true - giving the user admin privileges for the club
    [HttpPost("giveAdminPriv")]
    public ActionResult<bool> GiveAdminPriv(int ClubId, int UserId)
    {
        // find clubuser record with matching ClubId and  UserId
        ClubUser? result = dbContext.ClubUsers
            .Where(clubUser => clubUser.UserId == UserId && clubUser.ClubId == ClubId)
            .FirstOrDefault();

        // case where a club user with the given ClubId and UserId exists
        if (result != null)
        {
            result.Admin = true;
            dbContext.SaveChanges();
            return Ok(true);
        }

        return NotFound(false);
    }

    // action method that sets the given clubuser's admin state to false - removing the user admin privileges for the club
    [HttpPost("removeAdminPriv")]
    public ActionResult<bool> RemoveAdminPriv(int ClubId, int UserId)
    {
        // find clubuser record with matching ClubId and  UserId
        ClubUser? result = dbContext.ClubUsers
            .Where(clubUser => clubUser.UserId == UserId && clubUser.ClubId == ClubId)
            .FirstOrDefault();

        // case where a club user with the given ClubId and UserId exists
        if (result != null)
        {
            result.Admin = false;
            dbContext.SaveChanges();
            return Ok(true);
        }

        return NotFound(false);
    }
}