using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class ClubThreadCursorValDTO
{
    [Required]
    public int? CursorThreadId {  get; set; }

    [Required]
    public DateTime? CursorTimeAgo { get; set; }

    [Required]
    public int? ClubId { get; set; }
    
    public int? ParentThreadId { get; set; }   // nullable
}

