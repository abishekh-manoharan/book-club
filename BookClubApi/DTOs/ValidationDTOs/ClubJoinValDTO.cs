using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ClubJoinValDTO {
    [Required]
    public int? ClubId {get; set;}
    
    [Required]
    public int? UserId {get; set;}
}