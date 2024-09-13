using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace BookClubApi.Models;

public partial class Book
{
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
