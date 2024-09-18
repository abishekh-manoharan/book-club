using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class MeetingValidationDto
{

    public int MeetingId { get; set; }
    
    [Required]
    public int? BookId { get; set; }
    
    [Required]
    public int? ClubId { get; set; }
    
    [Required]
    public DateTime? StartTime { get; set; }
    
    public DateTime EndTime { get; set; }
    
    public string? Description { get; set; } 
}
