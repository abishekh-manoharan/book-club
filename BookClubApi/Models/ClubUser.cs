using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class ClubUser
{
    public int ClubId { get; set; }

    public int UserId { get; set; }

    public bool? Admin { get; set; }

    public virtual Club Club { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
