using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class CreateNotificationClubMembersValDTO
{
    public string Text { get; set; } = null!;

    public string? Link { get; set; }

    [Required]
    public DateTime? Time { get; set; }

    [Required]
    public int? ClubId { get; set; }
}