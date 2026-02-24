using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class ThreadCursorValDTO
{
    [Required]
    public int? CursorThreadId { get; set; }

    [Required]
    public DateTime? CursorTimeAgo { get; set; }

    [Required]
    public int? BookId { get; set; }

    [Required]
    public int? ClubId { get; set; }
}

