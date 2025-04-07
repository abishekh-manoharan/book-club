using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class MeetingCreationValidationDto
{

    public int MeetingId { get; set; }
    
    [Required]
    public int? BookId { get; set; }
    
    [Required]
    public int? ClubId { get; set; }
    
    public string Name { get; set; } = null!;
    
    [Required]
    public DateTime? StartTime { get; set; }
    
    public DateTime EndTime { get; set; }
    
    public string? Description { get; set; } 
}
