using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ReadingUserValDTO {

    [Required]
    public int? UserId { get; set; }

    [Required]
    public int? BookId { get; set; }

    [Required]
    public int? ClubId { get; set; }

}