namespace BookClubApi.DTOs;

public class NotificationDTO {
    public NotificationDTO(int notificationId, int userId, string text, DateTime time, string? link = null!)
    {
        NotificationId = notificationId;
        UserId = userId;
        Text = text;
        Link = link;
        Time = time;
    }

    public int NotificationId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public string? Link { get; set; }

    public DateTime Time { get; set; }
}