namespace BookClubApi.DTOs;

public class NotificationDTO
{
    public NotificationDTO(int notificationId, int userId, string text, DateTime time, bool read, string? link = null!)
    {
        NotificationId = notificationId;
        UserId = userId;
        Text = text;
        Link = link;
        Time = time;
        Read = read;
    }

    public int NotificationId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public string? Link { get; set; }

    public DateTime Time { get; set; }

    public bool Read { get; set; }
}