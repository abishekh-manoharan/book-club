using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class UpdateReadingProgressValDTO
{
    [Required]
    public int? ClubId { get; set; }
    [Required]
    public int? BookId { get; set; }
    [Required]
    public int? Progress { get; set; }
    [Required]
    public int? ProgresstypeId { get; set; }
}
