namespace BookClubApi.DTOs;

public class PollDTO
{
    public PollDTO(int pollId, int clubId, string name, bool open, DateTime createdDate)
    {
        PollId = pollId;
        ClubId = clubId;
        Name = name;
        Open = open;
        CreatedDate = createdDate;
    }

    public int PollId { get; set; }

    public int ClubId { get; set; }

    public string Name { get; set; } = null!;

    public bool Open { get; set; }

    public DateTime CreatedDate { get; set; }
}