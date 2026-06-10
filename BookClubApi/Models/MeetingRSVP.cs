namespace BookClubApi.Models;

public partial class MeetingRSVP
{
    public int MeetingId { get; set; }

    public int UserId { get; set; }

    public string RSVP { get; set; } = null!;

    public virtual User User { get; set; } = null!;
    
    public virtual Meeting Meeting { get; set; } = null!;

}
