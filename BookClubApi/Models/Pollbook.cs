using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class Pollbook
{
    public int PollId { get; set; }

    public int BookId { get; set; }

    public int? Votes { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual Poll Poll { get; set; } = null!;
}
