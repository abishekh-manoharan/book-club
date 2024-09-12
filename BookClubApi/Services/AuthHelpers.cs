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

    public async Task<User?> GetUserClassOfLoggedInUser(System.Security.Claims.ClaimsPrincipal User)
    {
        var aspNetUser = await userManager.GetUserAsync(User);
        if(aspNetUser!=null){
            User? user = dbContext.Users.Where(user => user.AspnetusersId == aspNetUser!.Id).AsNoTracking().FirstOrDefault();
            return user;
        }
        return null;
    }

    public async Task<bool?> IsUserAdminOfClub(System.Security.Claims.ClaimsPrincipal User, int ClubId)
    {
        var aspNetUser = await userManager.GetUserAsync(User);
        if(aspNetUser!=null){
            User? user = dbContext.Users.Where(user => user.AspnetusersId == aspNetUser!.Id).AsNoTracking().FirstOrDefault();
            if(user!=null){
                ClubUser? clubUser = dbContext.ClubUsers.Where(clubUser => clubUser.ClubId == ClubId && clubUser.UserId == user.UserId).AsNoTracking().FirstOrDefault();
                if(clubUser!=null){
                    return clubUser.Admin;
                }                 
            }
        }
        return null;
    }
}