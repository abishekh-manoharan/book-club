namespace BookClubApi.Services;

using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Mysqlx.Notice;

public class AuthHelpers : IAuthHelpers
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;

    public AuthHelpers(UserManager<ApplicationUser> userManager, BookClubContext dbContext)
    {
        this.dbContext = dbContext;
        this.userManager = userManager;
    }

    public async Task<int> GetUserIdOfLoggedInUser(System.Security.Claims.ClaimsPrincipal User)
    {
        var aspNetUser = await userManager.GetUserAsync(User);
        var user = dbContext.Users.Where(user => user.AspnetusersId == aspNetUser!.Id).AsNoTracking().FirstOrDefault();

        return user.UserId;
    }
}