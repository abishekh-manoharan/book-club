namespace BookClubApi.Models;

public partial class ProgressType
{
    public int ProgresstypeId { get; set; }

    public string? ProgressType1 { get; set; }

    public virtual ICollection<Readinguser> Readingusers { get; set; } = new List<Readinguser>();

    public virtual ICollection<Reading> Readings { get; set; } = new List<Reading>();
}
