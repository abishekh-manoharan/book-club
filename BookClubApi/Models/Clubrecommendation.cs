using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class Clubrecommendation
{
    public int ClubId { get; set; }

    public int BookId { get; set; }

    public int? UserId { get; set; }

    public DateTime? DateAdded { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual Club Club { get; set; } = null!;

    public virtual User? User { get; set; }
}
