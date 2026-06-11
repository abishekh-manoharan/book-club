namespace BookClubApi.Models;

public partial class MeetingRSVPCreationValDTO
{
    public int MeetingId { get; set; }

    public string RSVP { get; set; } = null!;
}
