using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class Readinguser
{
    public Readinguser(int userId, int bookId, int clubId, int progress, int progresstypeId)
    {
        UserId = userId;
        BookId = bookId;
        ClubId = clubId;
        Progress = progress;
        ProgresstypeId = progresstypeId;
    }

    public int UserId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public int Progress { get; set; }
    
    public int? ProgressTotal { get; set; }

    public int ProgresstypeId { get; set; }

    public virtual ProgressType? Progresstype { get; set; }

    public virtual Reading Reading { get; set; } = null!;
    
    public virtual User User { get; set; } = null!;
}
