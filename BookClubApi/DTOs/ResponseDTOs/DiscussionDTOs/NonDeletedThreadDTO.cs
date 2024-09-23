namespace BookClubApi.DTOs;
public class NonDeletedThreadDTO
{
    public NonDeletedThreadDTO(int threadId, int? parentThreadId, int bookId, int clubId, int userId, string text, DateTime? timePosted, bool deleted)
    {
        ThreadId = threadId;
        ParentThreadId = parentThreadId;
        BookId = bookId;
        ClubId = clubId;
        UserId = userId;
        Text = text;
        TimePosted = timePosted;
        Deleted = deleted;
    }

    public int ThreadId { get; set; }

    public int? ParentThreadId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public DateTime? TimePosted { get; set; }

    public bool Deleted { get; set; }
}