using BookClubApi.Models;

namespace BookClubApi.Services;
public interface IAuthHelpers {
    Task<User?> GetUserClassOfLoggedInUser(System.Security.Claims.ClaimsPrincipal User);    
    Task<bool?> IsUserAdminOfClub(System.Security.Claims.ClaimsPrincipal User, int ClubId);
}