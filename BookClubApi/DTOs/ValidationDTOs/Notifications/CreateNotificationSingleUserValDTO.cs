using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class CreateNotificationSingleUserValDTO {

    [Required]
    public int? UserId { get; set; }

    public string Text { get; set; } = null!;

    public string? Link { get; set; }

}