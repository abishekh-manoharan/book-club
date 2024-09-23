namespace BookClubApi.DTOs;

public class DeletedThreadDTO
{
    public DeletedThreadDTO(int threadId, int? parentThreadId, int bookId, int clubId, DateTime? timePosted, bool deleted)
    {
        ThreadId = threadId;
        ParentThreadId = parentThreadId;
        BookId = bookId;
        ClubId = clubId;
        TimePosted = timePosted;
        Deleted = deleted;
    }

    public int ThreadId { get; set; }

    public int? ParentThreadId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public DateTime? TimePosted { get; set; }

    public bool Deleted { get; set; }
}
