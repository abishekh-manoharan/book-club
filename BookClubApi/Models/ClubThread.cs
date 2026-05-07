namespace BookClubApi.Models;

public partial class ClubThread
{
    public int ThreadId { get; set; }

    public int? ParentThreadId { get; set; }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;
    
    public string Heading { get; set; } = null!;

    public bool Pinned { get; set; }
    
    public bool Deleted { get; set; }
    
    public bool Announcement { get; set; }

    public DateTime? TimePosted { get; set; }

    public virtual ICollection<ClubThread> InverseParentThread { get; set; } = new List<ClubThread>();

    public virtual ClubThread? ParentThread { get; set; }

    public virtual User User { get; set; } = null!;
    
    public virtual Club Club { get; set; } = null!;
}
