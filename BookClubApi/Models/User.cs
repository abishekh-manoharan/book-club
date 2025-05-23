﻿using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class User
{
    public int UserId { get; set; }

    public string? Bio { get; set; }

    public string? FName { get; set; }

    public string? LName { get; set; }

    public string? ProfileImg { get; set; }

    public string? AspnetusersId { get; set; }

    public virtual AspNetUser? Aspnetusers { get; set; }

    public virtual ICollection<Club> Clubs { get; set; } = new List<Club>();

    public virtual ICollection<ClubUser> ClubUsers { get; set; } = new List<ClubUser>();

    public virtual ICollection<Clubrecommendation> Clubrecommendations { get; set; } = new List<Clubrecommendation>();

    public virtual ICollection<JoinRequest> JoinRequests { get; set; } = new List<JoinRequest>();

    public virtual ICollection<Notification> Notifications { get; set; } = new List<Notification>();

    public virtual ICollection<Thread> Threads { get; set; } = new List<Thread>();

    public virtual ICollection<Readinguser> Readingusers { get; set; } = new List<Readinguser>();

    public virtual ICollection<Poll> Polls { get; set; } = new List<Poll>();

    public virtual ICollection<PollVote> PollVotes { get; set; } = new List<PollVote>();
    
    public virtual ICollection<UserBook> UserBooks { get; set; } = new List<UserBook>();
}
