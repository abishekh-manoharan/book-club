namespace BookClubApi.DTOs;

public class PollVoteDTO
{
    public PollVoteDTO(int pollId, int userId)
    {
        PollId = pollId;
        UserId = userId;
    }

    public int PollId { get; set; }

    public int UserId { get; set; }
}