namespace BookClubApi.DTOs;

public class MeetingDTO
{
    public int MeetingId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public DateTime StartTime { get; set; }

    public DateTime? EndTime { get; set; }

    public string? Description { get; set; }

    public string Name { get; set; } = null!;
}