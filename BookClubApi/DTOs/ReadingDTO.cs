namespace BookClubApi.DTOs;

public class ReadingDTO
{

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public ReadingDTO(int bookId, int clubId, string? name, string? description)
    {
        BookId = bookId;
        ClubId = clubId;
        Name = name;
        Description = description;
    }

}