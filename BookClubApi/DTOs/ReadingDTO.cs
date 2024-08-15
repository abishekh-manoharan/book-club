namespace BookClubApi.DTOs;

public class ReaddingDTO
{

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public string? Name { get; set; }

    public string? Description { get; set; }

    public ReaddingDTO(int bookId, int clubId, string? name, string? description)
    {
        BookId = bookId;
        ClubId = clubId;
        Name = name;
        Description = description;
    }

}