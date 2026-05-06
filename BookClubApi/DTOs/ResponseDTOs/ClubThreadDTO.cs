namespace BookClubApi.DTOs;

public class ClubThreadDTO
{
    public ClubThreadDTO(
        int threadId,
        int? parentThreadId,
        int clubId,
        int userId,
        string text,
        string heading,
        bool pinned,
        bool deleted,
        DateTime? timePosted
        )
    {
        ThreadId = threadId;
        ParentThreadId = parentThreadId;
        ClubId = clubId;
        UserId = userId;
        Text = text;
        Heading = heading;
        Pinned = pinned;
        Deleted = deleted;
        TimePosted = timePosted;
    }

    public int ThreadId { get; set; }

    public int? ParentThreadId { get; set; }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public string Heading { get; set; } = null!;

    public bool Pinned { get; set; }

    public bool Deleted { get; set; }

    public DateTime? TimePosted { get; set; }
}