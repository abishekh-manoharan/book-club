using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public partial class ThreadCreationValidationDTO
{
    [Required]
    public int? BookId { get; set; }

    [Required]
    public int? ClubId { get; set; }

    public string Text { get; set; } = null!;
}
