namespace BookClubApi.Models;

public class Notification
{
    public int NotificationId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public string? Link { get; set; }
    
    public bool Read { get; set; }

    public DateTime Time { get; set; }

    public virtual User User { get; set; } = null!;
}
