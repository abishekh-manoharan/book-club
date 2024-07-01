using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class Book
{
    public int BookId { get; set; }

    public string Title { get; set; } = null!;

    public string AuthorName { get; set; } = null!;

    public int? FirstPublishYear { get; set; }

    public int? NumberOfPagesMedian { get; set; }

    public float? RatingsAverage { get; set; }

    public virtual ICollection<Clubrecommendation> Clubrecommendations { get; set; } = new List<Clubrecommendation>();

    public virtual ICollection<Pollbook> Pollbooks { get; set; } = new List<Pollbook>();

    public virtual ICollection<Reading> Readings { get; set; } = new List<Reading>();

    public virtual ICollection<UserBook> UserBooks { get; set; } = new List<UserBook>();
}
