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
public class PollController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;

    public PollController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers, IClubService clubService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
        this.clubService = clubService;
    }

    // action method that allows a club admin to create a poll
    [HttpPost("createPoll")]
    [Authorize]
    public async Task<ActionResult<int>> CreatePoll(PollCreationDTO poll)
    {
        if (ModelState.IsValid)
        {
            // ensure user is admin of club
            var adminStatus = await authHelpers.IsUserAdminOfClub(User, (int)poll.ClubId!);
            if (adminStatus == true)
            {
                // try creating poll
                Poll newPoll = new()
                {
                    ClubId = (int)poll.ClubId!,
                    Name = poll.Name,
                    Open = true,
                    CreatedDate = DateTime.Now,
                };
                try
                {
                    dbContext.Polls.Add(newPoll);
                    dbContext.SaveChanges();

                    PollDTO newPollDTO = new((int)newPoll.PollId!, newPoll.ClubId, newPoll.Name, newPoll.Open, newPoll.CreatedDate);

                    return Ok(newPollDTO);
                }
                catch (DbUpdateException dbe)
                {
                    // if poll exists already, return 409 conflict status
                    if (dbe.InnerException!.Message.Contains("Duplicate"))
                    {
                        return Conflict("Poll already exists.");
                    }
                    // if a FK error arises, return 400 status
                    else if (dbe.InnerException!.Message.Contains("foreign key constraint fails"))
                    {
                        return BadRequest("FK constraint violated. Ensure clubId is valid.");
                    }
                    return StatusCode(500, "Error saving the poll to the database. \n" + dbe.Message);
                }
                catch (Exception e)
                {
                    // handling all other errors when trying to save to db
                    return StatusCode(500, "Error saving the poll to the database. \n" + e.Message);
                }
            }
            return Unauthorized("User isn't authorized to create a poll.");
        }
        return BadRequest(ModelState);
    }

    //action method that allows a club admin to create a pollBook instance
    [HttpPost("createPollBook")]
    [Authorize]
    public async Task<ActionResult<int>> CreatePollBook(PollBookCreationDTO pollbook)
    {
        if (ModelState.IsValid)
        {
            // getting poll to ensure it exists and for ClubId property to use to ensure user is admin
            var poll = dbContext.Polls.Where(poll => poll.PollId == pollbook.PollId).AsNoTracking().FirstOrDefault();
            if (poll != null)
            {
                // ensure user is admin of club
                var adminStatus = await authHelpers.IsUserAdminOfClub(User, (int)poll.ClubId!);
                if (adminStatus == true)
                {
                    // try creating pollbook
                    Pollbook newPollBook = new()
                    {
                        PollId = (int)pollbook.PollId!,
                        BookId = (int)pollbook.BookId!,
                        Votes = 0,
                    };
                    try
                    {
                        dbContext.Pollbooks.Add(newPollBook);
                        dbContext.SaveChanges();

                        PollBookDTO newPollBookDTO = new(newPollBook.PollId, newPollBook.BookId, newPollBook.Votes);

                        return Ok(newPollBookDTO);
                    }
                    catch (DbUpdateException dbe)
                    {
                        // if pollbook exists already, return 409 conflict status
                        if (dbe.InnerException!.Message.Contains("Duplicate"))
                        {
                            return Conflict("PollBook already exists.");
                        }
                        // if a FK error arises, return 400 status
                        else if (dbe.InnerException!.Message.Contains("foreign key constraint fails"))
                        {
                            return BadRequest("FK constraint violated. Ensure pollId and bookId are valid.");
                        }
                        return StatusCode(500, "Error saving the pollbook to the database. \n" + dbe.Message);
                    }
                    catch (Exception e)
                    {
                        // handling all other errors when trying to save to db
                        return StatusCode(500, "Error saving the pollbook to the database. \n" + e.Message);
                    }
                }
                return Unauthorized("User isn't authorized to create a poll.");
            }
            return NotFound("Poll with the provided PollId not found");
        }
        return BadRequest(ModelState);
    }

    // action method that return a single poll instance.
    // user can access if club is public or if user is a club member if the club is private
    [HttpGet("getOnePoll")]
    [Authorize]
    public async Task<ActionResult<PollDTO>> GetOnePoll([Required] int pollId)
    {
        if (ModelState.IsValid)
        {
            var poll = dbContext.Polls
                .Where(poll => poll.PollId == pollId)
                .AsNoTracking()
                .FirstOrDefault();

            // ensure poll with the provided id exists
            if (poll != null)
            {
                bool? clubPrivacy = clubService.IsClubPrivate(poll.ClubId);
                ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, poll.ClubId);

                // ensure club is either public or that the user is a club member if it's private
                if (clubPrivacy == false || clubUser != null)
                {
                    // generate poll DTO and return the poll
                    PollDTO pollDTO = new((int)poll.PollId!, poll.ClubId, poll.Name, poll.Open, poll.CreatedDate);
                    return Ok(pollDTO);
                }

                return Unauthorized("User is unauthorized to view the poll. Ensure the club is public or that the user is a member of the club.");
            }
            return NotFound("Poll with the provided ID not found.");
        }
        return BadRequest(ModelState);
    }

    // action method that return a all poll instances of a club.
    // user can access if club is public or if user is a club member if the club is private
    [HttpGet("getAllPollsOfClub")]
    [Authorize]
    public async Task<ActionResult<PollDTO>> GetAllPollsOfClub([Required] int clubId)
    {
        if (ModelState.IsValid)
        {
            var club = dbContext.Clubs
                .Where(club => club.ClubId == clubId)
                .AsNoTracking()
                .FirstOrDefault();

            // ensure club with the provided id exists
            if (club != null)
            {
                ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);

                // ensure club is either public or that the user is a club member if it's private
                if (club.Private == false || clubUser != null)
                {
                    // get all polls associated with the club
                    List<Poll> polls = dbContext.Polls
                        .Where(poll => poll.ClubId == clubId)
                        .AsNoTracking()
                        .ToList();

                    // convert polls list to pollDTO List
                    List<PollDTO> pollDtos = [];
                    foreach (Poll poll in polls)
                    {
                        PollDTO pollDTO = new((int)poll.PollId!, poll.ClubId, poll.Name, poll.Open, poll.CreatedDate);
                        pollDtos.Add(pollDTO);
                    }
                    return Ok(pollDtos);
                }

                return Unauthorized("User is unauthorized to view the poll collection. Ensure the club is public or that the user is a member of the club.");
            }
            return NotFound("Club with the provided ID not found.");
        }
        return BadRequest(ModelState);
    }

    // action method that return a all pollbook instances of a poll.
    // user can access if club is public or if user is a club member if the club is private
    [HttpGet("getAllPollsBooksOfPoll")]
    [Authorize]
    public async Task<ActionResult<PollDTO>> GetAllPollsBooksOfPoll([Required] int pollId)
    {
        if (ModelState.IsValid)
        {
            var poll = dbContext.Polls
                .Where(poll => poll.PollId == pollId)
                .AsNoTracking()
                .FirstOrDefault();

            // ensure poll with the provided id exists
            if (poll != null)
            {
                bool? clubPrivacy = clubService.IsClubPrivate(poll.ClubId);
                ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, poll.ClubId);

                // ensure club is either public or that the user is a club member if it's private
                if (clubPrivacy == false || clubUser != null)
                {
                    // get all pollbooks associated with the poll
                    List<Pollbook> pollbooks = dbContext.Pollbooks
                        .Where(pollbook => pollbook.PollId == pollId)
                        .AsNoTracking()
                        .ToList();

                    // convert pollbook list to pollbookDTO List
                    List<PollBookDTO> pollbookDtos = [];
                    foreach (Pollbook pollbook in pollbooks)
                    {
                        PollBookDTO pollbookDTO = new(pollbook.PollId, pollbook.BookId, pollbook.Votes);
                        pollbookDtos.Add(pollbookDTO);
                    }
                    return Ok(pollbookDtos);
                }

                return Unauthorized("User is unauthorized to view the pollbooks. Ensure the club is public or that the user is a member of the club.");
            }
            return NotFound("Poll with the provided ID not found.");
        }
        return BadRequest(ModelState);
    }

    // action method used to allow a club member to cast a vote in an existing poll
    [HttpPost("castVote")]
    [Authorize]
    public async Task<ActionResult<PollVoteDTO>> CastVote([Required] int pollId, [Required] int bookId)
    {
        if (ModelState.IsValid)
        {
            // get poll using pollId to ensure poll exists
            Poll? poll = dbContext.Polls.Where(poll => poll.PollId == pollId).AsNoTracking().FirstOrDefault();
            // get pollbook using pollId and bookId to ensure pollbook exists
            Pollbook? pollbook = dbContext.Pollbooks.Where(pollbook => pollbook.PollId == pollId && pollbook.BookId == bookId).FirstOrDefault();

            if (poll != null && pollbook != null)
            {
                if (poll!.Open == true)
                {

                    // get clubuser
                    ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, poll.ClubId);
                    if (clubUser != null)
                    {
                        // attempt to create pollvote
                        PollVote pollVote = new(pollId, clubUser.UserId);

                        try
                        {
                            dbContext.PollVotes.Add(pollVote);
                            dbContext.SaveChanges();
                        }
                        catch (DbUpdateException dbe)
                        {
                            // case where the user has already voted in the poll
                            if (dbe.InnerException!.Message.Contains("Duplicate"))
                            {
                                return Conflict("User has already voted in this poll.");
                            }
                            return StatusCode(500, "Error saving the reading to the database. \n" + dbe.Message);
                        }
                        catch (Exception e)
                        {
                            // handling all other errors when trying to save to db
                            return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
                        }

                        try
                        {
                            // increase vote count of pollbook
                            pollbook.Votes += 1;
                            dbContext.SaveChanges();
                        }
                        catch (Exception e)
                        {
                            // handling all other errors when trying to save to db
                            return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
                        }

                        // return pollVote dto
                        PollVoteDTO pollVoteDTO = new(pollVote.PollId, pollVote.UserId);
                        return Ok(pollVoteDTO);
                    }
                    return Unauthorized("User must be member of the club to perform this action.");
                }
                return BadRequest("Poll is closed and no new votes can be cast.");
            }
            return NotFound("Poll or pollbook not found with the provided Ids");
        }
        return BadRequest(ModelState);
    }

    // action method that allows a club admin to delete a poll instance
    [HttpDelete("delete")]
    [Authorize]
    public async Task<ActionResult<Poll>> DeletePoll([Required] int pollId)
    {
        if (ModelState.IsValid)
        {
            // ensure poll exists
            Poll? poll = dbContext.Polls.Where(poll => poll.PollId == pollId).FirstOrDefault();
            if (poll != null)
            {
                // ensure user is admin of club
                var isUserAdmin = await authHelpers.IsUserAdminOfClub(User, poll.ClubId);

                if(isUserAdmin == true) {
                    dbContext.Polls.Remove(poll);
                    dbContext.SaveChanges();
                    return Ok(poll);
                }

                return Unauthorized("User isn't authorized to delete a poll.");
            }
            return NotFound("Poll with the given id not found.");
        }
        return BadRequest(ModelState);
    }

}