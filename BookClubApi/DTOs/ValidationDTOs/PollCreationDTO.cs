using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class PollCreationDTO
{
    [Required]
    public int? ClubId { get; set; }

    public string Name { get; set; } = null!;
}
