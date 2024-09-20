using System.ComponentModel.DataAnnotations;

namespace BookClubApi.DTOs;

public class ThreadDTO
{

    public int ThreadId { get; set; }

    public int? ParentThreadId { get; set; }

    public int BookId { get; set; }

    public int ClubId { get; set; }

    public int UserId { get; set; }

    public string Text { get; set; } = null!;

    public DateTime? TimePosted { get; set; }
    
    public bool Deleted { get; set; }
    
}