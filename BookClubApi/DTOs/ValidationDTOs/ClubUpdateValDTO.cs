using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ClubUpdateValDTO
{
    [Required]
    public int? ClubId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }

    public string? ProfileImg { get; set; }
    
    [Required]
    public bool? Private { get; set; }

}
