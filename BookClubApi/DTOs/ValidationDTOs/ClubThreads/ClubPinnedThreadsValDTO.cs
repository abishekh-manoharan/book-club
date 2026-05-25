using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class ClubPinnedThreadsValDTO
{
    [Required]
    public int? ClubId { get; set; }
    
}

