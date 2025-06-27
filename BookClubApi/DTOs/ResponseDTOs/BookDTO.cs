using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;
public class BookDTO {
    public BookDTO(int bookId, int? cover_Id, string title, string authorName, string ol_key, int? firstPublishYear, int? numberOfPagesMedian, float? ratingsAverage)
    {
        BookId = bookId;
        Cover_Id = cover_Id;
        Title = title;
        AuthorName = authorName;
        Ol_key = ol_key;
        FirstPublishYear = firstPublishYear;
        NumberOfPagesMedian = numberOfPagesMedian;
        RatingsAverage = ratingsAverage;
    }

    public int BookId { get; set; }

    public int? Cover_Id { get; set; }

    public string Title { get; set; } = null!;

    public string? AuthorName { get; set; }
    
    public string Ol_key { get; set; } = null!;

    public int? FirstPublishYear { get; set; }
    
    public int? NumberOfPagesMedian { get; set; }
    
    public float? RatingsAverage { get; set; }

}