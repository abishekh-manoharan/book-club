namespace BookClubApi.Services;

using BookClubApi.Models;

public interface IClubService 
{

    // service method that takes in a club id and returns true if the club is private, false if the club isn't private, or null if the club doesn't exist
    bool? IsClubPrivate(int clubId);
    
    // service method that takes in a club id and book id and returns true if the reading exists, false if the reading doesn't exist
    bool DoesReadingExist(int clubId, int bookId);
    
    // service method that takes in a meeting id and returns true if the meeting exists, false if the meeting doesn't exist
    bool DoesMeetingExist(int meetingId);

    // service method that returns a reading
    Task<Readinguser?> GetReadinguser(System.Security.Claims.ClaimsPrincipal User, int clubId, int bookId);
}