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
public class ClubController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;

    public ClubController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
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
            ClubDTO clubDTO = new(club.ClubId, club.Name, club.Description, club.ProfileImg, club.Creator, club.Private);
            return Ok(clubDTO);
        }

        return NotFound(null);
    }

    // Action method that takes in new club instance's data and creates a club record and clubuser record using new club's ID and logged in user's ID as Composite PK
    [HttpPost("create")]
    public async Task<ActionResult<ClubDTO>> CreateClub(Club club)
    {
        if (club.Name == null)
        {
            return StatusCode(400, "Club name is a required field.");
        }

        // ensure ClubId is 0 so that a new Id will be generated on add
        club.ClubId = 0;
        // ensure club creator's username is specified as creator
        var aspUser = await userManager.GetUserAsync(User);
        club.Creator = aspUser!.UserName!;

        // create club record and saving it to the DB
        dbContext.Clubs.Add(club);
        dbContext.SaveChanges(); // will populate the club object's ID field

        // find user object associated with AspNetUserId for ClubUser creation
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
        ClubDTO createdClub = new(club.ClubId, club.Name, club.Description, club.ProfileImg, club.Creator, club.Private);
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
        // TODO: ensure that the user who's trying to delete the club is admin of the club
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
            ClubDTO foundClubDTO = new(foundClub.ClubId, foundClub.Name, foundClub.Description, foundClub.ProfileImg, foundClub.Creator, foundClub.Private);

            clubs.Add(foundClubDTO);
        }

        // returning retrieved clubs from 
        return Ok(clubs);

    }

    // action method joins a user to a club
    // returns true if join is successful
    // returns false if join is failed
    [Authorize]
    [HttpPost("join")]
    public ActionResult<bool> JoinClub(int UserId, int ClubId)
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
        ClubUser? clubUser = dbContext.ClubUsers
            .Where(clubUser => clubUser.ClubId == ClubId && clubUser.UserId == UserId)
            .AsNoTracking()
            .FirstOrDefault();


        // case where both user and club exist, and user hasn't already joined the club
        if (club != null && user != null && clubUser == null)
        {
            // getting logged in user and if the logged in user's clubuser record to see if the user is admin of club
            var loggedInUser = dbContext.Users
                .Where(u => u.AspnetusersId == userManager.GetUserId(User))
                .FirstOrDefault();
            var clubUserLoggedInUser = dbContext.ClubUsers
                .Where(clubUser => clubUser.UserId == loggedInUser!.UserId && clubUser.ClubId == ClubId)
                .AsNoTracking()
                .FirstOrDefault();


            // if club is public or if the logged in user is admin, allow the join
            if (!club.Private || clubUserLoggedInUser != null && clubUserLoggedInUser.Admin == true)
            {
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

                // delete the join request if the Admin of the club is sending request
                if (clubUserLoggedInUser != null && clubUserLoggedInUser.Admin == true)
                {
                    var joinReqCheck = dbContext.JoinRequests
                        .Where(joinReq => joinReq.ClubId == ClubId && joinReq.UserId == UserId)
                        .AsNoTracking()
                        .FirstOrDefault();

                    if (joinReqCheck != null)
                    {
                        dbContext.JoinRequests.Remove(joinReqCheck);
                        dbContext.SaveChanges();
                    }
                }

                return Ok(true);
            }

            // if the club trying to be joined is private & logged in user isn't admin, create a join request
            if (club.Private || clubUserLoggedInUser != null && clubUserLoggedInUser.Admin == false)
            {
                // check if join request has already been made. return status 409 otherwise
                var joinReqCheck = dbContext.JoinRequests
                    .Where(joinReq => joinReq.ClubId == ClubId && joinReq.UserId == UserId)
                    .AsNoTracking()
                    .FirstOrDefault();


                if (joinReqCheck == null)
                {
                    // create join request if join request hasn't been made already
                    JoinRequest newJoinRequest = new(ClubId, UserId, true, false);
                    dbContext.JoinRequests.Add(newJoinRequest);
                    try
                    {
                        dbContext.SaveChanges();
                    }
                    catch (DbUpdateException)
                    {
                        return StatusCode(409, false);
                    }
                    catch
                    {
                        // all other error cases
                        return StatusCode(400, false);
                    }
                    return Ok(true);
                }
                // case where the join request has already been made
                return StatusCode(409, false);
            }
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

    // Action methods that returns all users who have joined the specified club
    // takes in ClubId as agument
    // returns a list of User objects
    [HttpGet("clubUsers")]
    public ActionResult<List<UserDTO>> GetUsersOfAClub(int ClubId)
    {
        // getting all club users where the ClubId matches the argument
        var clubUsers = dbContext.ClubUsers
            .Where(clubUser => clubUser.ClubId == ClubId)
            .AsNoTracking()
            .ToList();

        // filling empty users list with users in the club
        List<UserDTO> users = new();
        foreach (var clubUser in clubUsers)
        {
            var user = dbContext.Users
                .Where(user => user.UserId == clubUser.UserId)
                .AsNoTracking()
                .First();

            UserDTO userDTO = new(user.UserId, user.Bio, user.FName, user.LName, user.ProfileImg, user.AspnetusersId);
            users.Add(userDTO);
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

    // action method that attains a search text, queries the club table's name and creator properties using full-text search, and returns the result
    [HttpGet("getSearchResults/{query}")]
    public ActionResult<List<ClubDTO>> GetSearchResults(string query)
    {
        if (string.IsNullOrWhiteSpace(query))
        {
            return BadRequest("The search query cannot be empty");
        }

        var results = dbContext.Clubs
            .FromSqlRaw("SELECT * FROM club WHERE MATCH(name, Creator) AGAINST({0} IN boolean mode)", query + "*")
            .ToList();

        List<ClubDTO> resultToReturn = [];
        foreach (Club club in results)
        {
            resultToReturn.Add(
                new ClubDTO(club.ClubId, club.Name, club.Description, club.ProfileImg, club.Creator, club.Private)
            );
        }

        return resultToReturn;
    }

    // action method that attempts to invite a user to a club. returns true if invitation goes through, false otherwise
    [HttpPost("inviteUserToClub")]
    [Authorize]
    public async Task<ActionResult<bool>> InviteUserToClub(int ClubId, int UserId)
    {
        // getting necessary DB records for invitation logic
        // get logged in user info
        var aspNetUser = await userManager.GetUserAsync(User);
        // get logged in user's associated user record
        var user = dbContext.Users.Where(user => user.AspnetusersId == aspNetUser!.Id).AsNoTracking().FirstOrDefault();
        // get logged in user's associated clubuser record
        var clubUser = dbContext.ClubUsers.Where(clubUser => clubUser.UserId == user!.UserId && clubUser.ClubId == ClubId).AsNoTracking().FirstOrDefault();
        // get club instance that invitation is intended for
        var club = dbContext.Clubs.Where(club => club.ClubId == ClubId).AsNoTracking().FirstOrDefault();

        // ensure logged in user is member of the club and that club and user exists
        if (clubUser != null && club != null && user != null)
        {
            // allow invite if logged in user is admin to the club, or the club is public
            if (clubUser.Admin == true || club.Private == false)
            {
                try
                {
                    JoinRequest invitation = new(ClubId, UserId, false, true);
                    dbContext.JoinRequests.Add(invitation);
                    dbContext.SaveChanges();
                    return Ok(true);
                }
                catch
                {
                    // case where invitation already exists
                    return StatusCode(409, false);
                }
            }
        }
        return NotFound(false);
    }

    // action method to get invitations of the logged in user 
    [HttpGet("getLoggedInUserInvitations")]
    [Authorize]
    public async Task<ActionResult<List<JoinRequest>>> GetLoggedInUserInvitations()
    {
        // get logged in user's associated user class
        var aspNetUser = await userManager.GetUserAsync(User);
        var user = dbContext.Users.Where(user => user.AspnetusersId == aspNetUser!.Id).AsNoTracking().FirstOrDefault();

        // get all JoinRequests associated with the user and that has the invitation flag
        var invitations = dbContext.JoinRequests
            .Where(jr => jr.UserId == user!.UserId && jr.Invitation == true)
            .AsNoTracking()
            .ToList();

        return Ok(invitations);
    }

    // action method to accept invitation
    [HttpPost("AcceptInvitation")]
    [Authorize]
    public async Task<ActionResult<List<JoinRequest>>> AcceptInvitation(int? ClubId)
    {
        if (ModelState.IsValid || ClubId != null)
        {
            // get user Id of logged in user
            int userId = await authHelpers.GetUserIdOfLoggedInUser(User);

            // create ClubUser

            // if user is already member of the club, remove invitation from DB

            // remove invitation from DB

            return Ok(userId);
        }
        return BadRequest(ModelState); // Returns a 400 Bad Request with error details
    }

    // TODO: action method to reject invitation


    // private async Task<int> GetUserIdOfLoggedInUser()
    // {
    //     var aspNetUser = await userManager.GetUserAsync(User);
    //     var user = dbContext.Users.Where(user => user.AspnetusersId == aspNetUser!.Id).AsNoTracking().FirstOrDefault();
        
    //     return user.UserId;
    // }
}