using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class CreateNotificationReadingUsersValDTO
{

    public string Text { get; set; } = null!;

    public string? Link { get; set; }

    [Required]
    public int? ClubId { get; set; }

    [Required]
    public int? BookId { get; set; }
}