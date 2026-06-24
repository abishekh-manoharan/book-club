namespace BookClubApi.DTOs;

public class MeetingRSVPDTO
{
    public int MeetingId { get; set; }

    public int UserId { get; set; }

    public string RSVP { get; set; } = null!;

    public string? FName { get; set; }

    public string? LName { get; set; }

    public string? ProfileImg { get; set; }
}