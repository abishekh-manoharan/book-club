namespace BookClubApi.Models;

public partial class AnnouncementThread
{
    public int AnnouncementThreadId { get; set; }

    public int? ParentAnnouncementThreadId { get; set; }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public bool Pinned { get; set; }

    public DateTime? TimePosted { get; set; }

    public virtual ICollection<AnnouncementThread> InverseParentThread { get; set; } = new List<AnnouncementThread>();

    public virtual AnnouncementThread? ParentThread { get; set; }

    public virtual User User { get; set; } = null!;
    
    public virtual Club Club { get; set; } = null!;
}
