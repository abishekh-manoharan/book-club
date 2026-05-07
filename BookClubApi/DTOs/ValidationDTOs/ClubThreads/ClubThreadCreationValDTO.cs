using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class ClubThreadCreationValDTO
{
    [Required]
    public int? ClubId { get; set; }

    [Required]
    public string Text { get; set; } = null!;
    
    public string? Heading { get; set; }

    public bool Pinned { get; set; }
    
    public bool Deleted { get; set; }
}
