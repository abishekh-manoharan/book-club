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
    public ActionResult<int> CreatePoll(PollCreationDTO poll) {
        if(ModelState.IsValid){
            return Ok();
        }
        return BadRequest(ModelState);
    }
}