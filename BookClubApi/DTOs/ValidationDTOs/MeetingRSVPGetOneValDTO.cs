using System.ComponentModel.DataAnnotations;

namespace BookClubApi.Models;

public partial class MeetingRSVPGetOneValDTO
{
    [Required]
    public int? MeetingId { get; set; }

    [Required]
    public string UserId { get; set; } = null!;
}
