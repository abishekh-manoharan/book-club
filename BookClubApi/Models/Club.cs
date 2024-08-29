using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class Club
{
    public int ClubId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public string? ProfileImg { get; set; }
    
    public string Creator { get; set; } = null!;

    public bool Private { get; set; }

    public virtual ICollection<ClubUser> ClubUsers { get; set; } = new List<ClubUser>();

    public virtual ICollection<Clubrecommendation> Clubrecommendations { get; set; } = new List<Clubrecommendation>();

    public virtual ICollection<JoinRequest> JoinRequests { get; set; } = new List<JoinRequest>();

    public virtual ICollection<Poll> Polls { get; set; } = new List<Poll>();

    public virtual ICollection<Reading> Readings { get; set; } = new List<Reading>();
}
