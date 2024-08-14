using Microsoft.AspNetCore.Identity;

namespace BookClubApi.Models;

public class ApplicationUser : IdentityUser {
    public string? Test { get; set; }
}