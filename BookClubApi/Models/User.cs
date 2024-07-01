using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Bio { get; set; }

    public string? Username { get; set; }

    public string? Hash { get; set; }

    public string? Salt { get; set; }

    public string? Email { get; set; }

    public string? FName { get; set; }

    public string? LName { get; set; }

    public string? ProfileImg { get; set; }

    public virtual ICollection<ClubUser> ClubUsers { get; set; } = new List<ClubUser>();

    public virtual ICollection<Clubrecommendation> Clubrecommendations { get; set; } = new List<Clubrecommendation>();

    public virtual ICollection<JoinRequest> JoinRequests { get; set; } = new List<JoinRequest>();

    public virtual ICollection<Thread> Threads { get; set; } = new List<Thread>();

    public virtual ICollection<UserBook> UserBooks { get; set; } = new List<UserBook>();

    public virtual ICollection<Poll> Polls { get; set; } = new List<Poll>();
}
