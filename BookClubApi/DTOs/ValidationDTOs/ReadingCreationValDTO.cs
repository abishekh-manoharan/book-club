using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;
public class ReadingCreationValDTO
{
    public ReadingCreationValDTO(int? clubId, string name, string description, int? bookId, int? cover_Id, string title, string authorName, int progresstypeId, string ol_key, int? firstPublishYear, int? numberOfPagesMedian, float? ratingsAverage, string status)
    {
        ClubId = clubId;
        Name = name;
        Description = description;
        BookId = bookId;
        Cover_Id = cover_Id;
        Title = title;
        AuthorName = authorName;
        ProgresstypeId = progresstypeId;
        Ol_key = ol_key;
        FirstPublishYear = firstPublishYear;
        NumberOfPagesMedian = numberOfPagesMedian;
        RatingsAverage = ratingsAverage;
        Status = status;
    }

    [Required]
    public int? ClubId { get; set; }

    public string Name { get; set; } = null!;

    public string? Description { get; set; } 
    
    public int ProgresstypeId { get; set; }
    
    [Required]
    public int? BookId { get; set; }

    public int? Cover_Id { get; set; }

    public string Title { get; set; } = null!;

    public string? AuthorName { get; set; }

    public string Ol_key { get; set; } = null!;

    public int? FirstPublishYear { get; set; }

    public int? NumberOfPagesMedian { get; set; }

    public float? RatingsAverage { get; set; }
    
    public string? Status { get; set; }
}