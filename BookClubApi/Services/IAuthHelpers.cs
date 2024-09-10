namespace BookClubApi.Services;
public interface IAuthHelpers {
    Task<int> GetUserIdOfLoggedInUser(System.Security.Claims.ClaimsPrincipal User);    
}