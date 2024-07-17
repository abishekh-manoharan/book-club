using Microsoft.AspNetCore.Identity;

namespace BookClubApi.Models;

public class ApplicationUser : IdentityUser {
        public int UserId { get; set; }
}