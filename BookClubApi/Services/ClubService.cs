namespace BookClubApi.Services;

using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Migrations;
using BookClubApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Mysqlx.Notice;

public class ClubService : IClubService
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;

    public ClubService(UserManager<ApplicationUser> userManager, BookClubContext dbContext)
    {
        this.dbContext = dbContext;
        this.userManager = userManager;
    }

    // service method that takes in a club id and returns true if the club is private, false if the club isn't private, or null if the club doesn't exist
    public bool? IsClubPrivate(int clubId)
    {
        var club = dbContext.Clubs.Where(club => club.ClubId == clubId).AsNoTracking().FirstOrDefault();
        if(club == null) {
            return null;
        }
        return club.Private;
    }

    // service method that takes in a club id and book id and returns true if the reading exists, false if the reading doesn't exist
    public bool DoesReadingExist(int clubId, int bookId)
    {
        var reading = dbContext.Readings.Where(reading => reading.ClubId == clubId && reading.BookId == bookId).AsNoTracking().FirstOrDefault();
        if(reading == null) {
            return false;
        }
        return true;
    }

    // service method that takes in a meeting id and returns true if the meeting exists, false if the meeting doesn't exist
    public bool DoesMeetingExist(int meetingId)
    {
        var meeting = dbContext.Meetings.Where(meeting => meeting.MeetingId == meetingId).AsNoTracking().FirstOrDefault();
        if(meeting == null) {
            return false;
        }
        return true;
    }
}