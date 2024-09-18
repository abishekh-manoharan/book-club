using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class Meeting
{
    public int MeetingId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? Description { get; set; }

    public virtual Reading? Reading { get; set; }
}
