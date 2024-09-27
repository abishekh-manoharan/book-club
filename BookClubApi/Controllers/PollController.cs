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
                    return StatusCode(500, "Error saving the reading to the database. \n" + dbe.Message);
                }
                catch (Exception e)
                {
                    // handling all other errors when trying to save to db
                    return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
                }
            }
            return Unauthorized("User isn't authorized to create a poll.");
        }
        return BadRequest(ModelState);
    }
}