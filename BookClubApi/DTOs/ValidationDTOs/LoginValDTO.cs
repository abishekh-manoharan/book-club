using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class LoginValDTO
{
    [Required]
    public string Email { get; set; }
    [Required]
    public string Password { get; set; }
}
