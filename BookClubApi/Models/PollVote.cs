namespace BookClubApi.Models;

public partial class PollVote
{
    public PollVote(int pollId, int userId)
    {
        PollId = pollId;
        UserId = userId;
    }

    public int PollId { get; set; }

    public int UserId { get; set; }

    public virtual Poll Poll { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
