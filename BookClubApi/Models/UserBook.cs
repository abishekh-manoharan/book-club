using System;
using System.Collections.Generic;

namespace BookClubApi.Models;

public partial class UserBook
{
    public UserBook(int bookId, int userId, DateTime? dateAdded)
    {
        BookId = bookId;
        UserId = userId;
        DateAdded = dateAdded;
    }

    public int BookId { get; set; }

    public int UserId { get; set; }

    public DateTime? DateAdded { get; set; }

    public virtual Book Book { get; set; } = null!;

    public virtual User User { get; set; } = null!;
}
