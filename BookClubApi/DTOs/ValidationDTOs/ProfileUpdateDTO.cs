using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ProfileUpdateDTO
{
    public string? Bio { get; set; }

    [Required]
    public string FName { get; set; } = null!;

    public string? LName { get; set; }

    [Required]
    public string? ProfileImg { get; set; }       
}