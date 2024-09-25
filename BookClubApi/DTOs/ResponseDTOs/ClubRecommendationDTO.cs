namespace BookClubApi.DTOs;
public class ClubRecommendationDTO
{
    public ClubRecommendationDTO(int clubId, int bookId, int userId, DateTime dateAdded)
    {
        ClubId = clubId;
        BookId = bookId;
        UserId = userId;
        DateAdded = dateAdded;
    }

    public int ClubId { get; set; }

    public int BookId { get; set; }

    public int UserId { get; set; }

    public DateTime DateAdded { get; set; }
}