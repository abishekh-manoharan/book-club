using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookClubApi.Models;

public partial class Book
{
    public Book(int? bookId, int? cover_Id, string title, string authorName, string ol_key, int? firstPublishYear, int? numberOfPagesMedian, float? ratingsAverage)
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

    public virtual ICollection<Clubrecommendation> Clubrecommendations { get; set; } = new List<Clubrecommendation>();

    public virtual ICollection<Pollbook> Pollbooks { get; set; } = new List<Pollbook>();

    public virtual ICollection<Reading> Readings { get; set; } = new List<Reading>();

    public virtual ICollection<UserBook> UserBooks { get; set; } = new List<UserBook>();
}
