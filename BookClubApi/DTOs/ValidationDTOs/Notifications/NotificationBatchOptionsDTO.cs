using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;
public class NotificationBatchOptionsDTO
{
    [Required]
    public int? pageNumber {get; set;}
    
    [Required]
    public int? batchSize {get; set;}
}