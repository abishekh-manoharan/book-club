namespace BookClubApi.DTOs;

public class AnnouncementThreadDTO
{
    public AnnouncementThreadDTO(
        int announcementThreadId,
        int? parentAnnouncementThreadId,
        int clubId,
        int userId,
        string text,
        string heading,
        bool pinned,
        bool deleted,
        DateTime? timePosted
        )
    {
        AnnouncementThreadId = announcementThreadId;
        ParentAnnouncementThreadId = parentAnnouncementThreadId;
        ClubId = clubId;
        UserId = userId;
        Text = text;
        Heading = heading;
        Pinned = pinned;
        Deleted = deleted;
        TimePosted = timePosted;
    }

    public int AnnouncementThreadId { get; set; }

    public int? ParentAnnouncementThreadId { get; set; }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public string Heading { get; set; } = null!;

    public bool Pinned { get; set; }

    public bool Deleted { get; set; }

    public DateTime? TimePosted { get; set; }
}