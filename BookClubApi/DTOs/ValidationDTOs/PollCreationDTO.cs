using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class PollCreationDTO
{
    public int ClubId { get; set; }

    public string Name { get; set; } = null!;

    public DateTime CreatedDate { get; set; }
}
