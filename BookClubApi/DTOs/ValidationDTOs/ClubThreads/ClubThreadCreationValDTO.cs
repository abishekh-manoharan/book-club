using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class ClubThreadCreationValDTO
{
    [Required]
    public int? ClubId { get; set; }

    [Required]
    public string Text { get; set; } = null!;
    
    public string? Heading { get; set; }

    [Required]
    public bool? Pinned { get; set; }

    [Required]
    public bool? Announcement { get; set; }
    
}
