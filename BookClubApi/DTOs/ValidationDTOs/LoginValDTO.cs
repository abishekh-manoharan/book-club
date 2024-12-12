using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class LoginValDTO
{
    [Required]
    public string email { get; set; }
    [Required]
    public string password { get; set; }
}
