namespace BookClubApi.Models;

public partial class Reading
{
    public int BookId { get; set; }

    public int ClubId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; }
    
    public string Status { get; set; } = null!;

    public DateTime StartDate { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual Club Club { get; set; } = null!;

    public virtual ICollection<Meeting> Meetings { get; set; } = new List<Meeting>();

    public virtual ICollection<Readinguser> Readingusers { get; set; } = new List<Readinguser>();

    public virtual ICollection<Thread> Threads { get; set; } = new List<Thread>();
}
