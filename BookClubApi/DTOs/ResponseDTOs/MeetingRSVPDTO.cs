namespace BookClubApi.DTOs;

public class MeetingRSVPDTO
{
    public int MeetingId { get; set; }

    public int UserId { get; set; }

    public string RSVP { get; set; } = null!;
}