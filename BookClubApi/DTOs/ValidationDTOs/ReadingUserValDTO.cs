using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ReadingUserValDTO {
    public ReadingUserValDTO(int userId, int bookId, int clubId, int progress, int progresstypeId)
    {
        UserId = userId;
        BookId = bookId;
        ClubId = clubId;
    }

    [Required]
    public int? UserId { get; set; }

    [Required]
    public int? BookId { get; set; }

    [Required]
    public int? ClubId { get; set; }

}