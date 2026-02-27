namespace BookClubApi.Models;

public partial class Poll
{
    public int? PollId { get; set; }

    public int ClubId { get; set; }

    public string Name { get; set; } = null!;

    public bool Open { get; set; }

    public DateTime CreatedDate { get; set; }

    public virtual Club? Club { get; set; }

    public virtual ICollection<Pollbook> Pollbooks { get; set; } = new List<Pollbook>();
    public virtual ICollection<PollVote> PollVotes { get; set; } = new List<PollVote>();
    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
