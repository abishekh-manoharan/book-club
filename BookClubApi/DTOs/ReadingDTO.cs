using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ReadingDTO
{

    public int BookId { get; set; }

    public int ClubId { get; set; }

    [Required]
    public string Name { get; set; } = null!;

    [Required]
    public string Description { get; set; } = null!;

    [Required]    
    public string Status { get; set; } = null!;

    public ReadingDTO(int bookId, int clubId, string name, string description, string status)
    {
        BookId = bookId;
        ClubId = clubId;
        Name = name;
        Description = description;
        Status = status;
    }

}