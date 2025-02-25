using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ClubUserGetValDTO {
    [Required]
    public int? ClubId {get; set;}
    
    [Required]
    public int? UserId {get; set;}
}