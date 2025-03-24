using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;
public class ReadingCreationValDTO
{
    public ReadingCreationValDTO(int? clubId, string name, string description, int? bookId, int? cover_Id, string title, string authorName, string ol_key, int? firstPublishYear, int? numberOfPagesMedian, float? ratingsAverage)
    {
        ClubId = clubId;
        Name = name;
        Description = description;
        BookId = bookId;
        Cover_Id = cover_Id;
        Title = title;
        AuthorName = authorName;
        Ol_key = ol_key;
        FirstPublishYear = firstPublishYear;
        NumberOfPagesMedian = numberOfPagesMedian;
        RatingsAverage = ratingsAverage;
    }

    [Required]
    public int? ClubId { get; set; }
    public string Name { get; set; } = null!;

    public string? Description { get; set; } 
    
    [Required]
    public int? BookId { get; set; }

    [Required]
    public int? Cover_Id { get; set; }

    public string Title { get; set; } = null!;

    public string AuthorName { get; set; } = null!;

    public string Ol_key { get; set; } = null!;

    [Required]
    public int? FirstPublishYear { get; set; }

    [Required]
    public int? NumberOfPagesMedian { get; set; }

    [Required]
    public float? RatingsAverage { get; set; }
}