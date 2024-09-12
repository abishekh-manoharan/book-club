using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class Readinguser
{
    public int UserId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public int? Progress { get; set; }

    public int? ProgresstypeId { get; set; }

    public virtual ProgressType? Progresstype { get; set; }

    public virtual Reading Reading { get; set; } = null!;
    
    public virtual User User { get; set; } = null!;
}
