using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class PollBookCreationDTO
{
    [Required]
    public int? PollId { get; set; }

    [Required]
    public int? BookId { get; set; }
}
