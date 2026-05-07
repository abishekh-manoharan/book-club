using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class ClubThreadReplyValDTO
{
    [Required]
    public int? ParentThreadId { get; set; }

    [Required]
    public int? ClubId { get; set; }

    public string Text { get; set; } = null!;
}
