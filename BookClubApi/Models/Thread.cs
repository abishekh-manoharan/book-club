namespace BookClubApi.Models;

public partial class Thread
{
    public int ThreadId { get; set; }

    public int? ParentThreadId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public bool Deleted { get; set; }

    public DateTime? TimePosted { get; set; }

    public virtual ICollection<Thread> InverseParentThread { get; set; } = new List<Thread>();

    public virtual Thread? ParentThread { get; set; }

    public virtual Reading Reading { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
