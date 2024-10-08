namespace BookClubApi.DTOs;
public class UserBookDTO {
    public UserBookDTO (int bookId, int userId, DateTime? dateAdded)
    {
        BookId = bookId;
        UserId = userId;
        DateAdded = dateAdded;
    }

    public int BookId { get; set; }

    public int UserId { get; set; }

    public DateTime? DateAdded { get; set; }
}