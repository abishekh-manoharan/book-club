using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;
public class UserSetProfileValDTO
{
    [Required]
    public string Url { get; set; } = string.Empty;
}