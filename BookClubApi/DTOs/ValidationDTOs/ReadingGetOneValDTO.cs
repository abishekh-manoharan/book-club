using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ReadingGetOneValDTO {
    
    [Required]
    public int? BookId {get; set;}
    [Required]
    public int? ClubId {get; set;}
}