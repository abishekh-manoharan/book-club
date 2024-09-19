namespace BookClubApi.Services;

using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using Mysqlx.Notice;

public interface IClubService 
{

    // service method that takes in a club id and returns true if the club is private, false if the club isn't private, or null if the club doesn't exist
    bool? IsClubPrivate(int clubId);
    
    // service method that takes in a club id and book id and returns true if the reading exists, false if the reading doesn't exist
    bool DoesReadingExist(int clubId, int bookId);
    
    // service method that takes in a meeting id and returns true if the meeting exists, false if the meeting doesn't exist
    bool DoesMeetingExist(int meetingId);
}