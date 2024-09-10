using BookClubApi.Models;

namespace BookClubApi.Services;
public interface IAuthHelpers {
    Task<User?> GetUserClassOfLoggedInUser(System.Security.Claims.ClaimsPrincipal User);    
}