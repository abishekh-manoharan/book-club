using System.ComponentModel.DataAnnotations;
using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using BookClubApi.Services;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class ReadingController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;

    public ReadingController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelper)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelper;
    }

    // action method that attains a book (attained through OpenLibrary API) and reading data, 
    // saves the book if needed, and creates a reading instance
    [HttpPost("create")]
    [Authorize]
    public async Task<ActionResult<Reading>> CreateReading([Required] int clubId, string name, string description, Book book)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure logged in user is the club's admin
            bool? admin = await authHelpers.IsUserAdminOfClub(User, clubId);
            if (admin == null || admin == false)
            {
                return Unauthorized("User isn't authorized to create a reading for this club.");
            }

            // save book to db if it doesn't exist already
            var searchedBook = dbContext.Books
                .Where(dbBook => dbBook.BookId == book.BookId)
                .AsNoTracking()
                .FirstOrDefault();
            if (searchedBook == null) {
                dbContext.Books
                    .Add(book);
                await dbContext.SaveChangesAsync();
            }

            // create reading
            try
            {
                Reading newReading = new()
                {
                    BookId = (int) book.BookId!,
                    ClubId = clubId,
                    Name = name,
                    Description = description,
                };

                dbContext.Readings.Add(newReading);
                dbContext.SaveChanges();

                return Ok(newReading);
            }
            catch (DbUpdateException dbe)
            {
                // if reading exists already, return 409 conflict status
                if (dbe.InnerException!.Message.Contains("Duplicate"))
                {
                    return Conflict("Reading already exists.");
                }
            }
            catch (Exception e) {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the reading to the database. \n"+e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that returns all reading records associated with a club
    [HttpGet("GetAllReadings")]
    public async Task<ActionResult<List<Reading>>> GetAllReadingsOfAClub([Required] int clubId) {
        if(ModelState.IsValid){
            // ensure club exists
            var club = dbContext.Clubs.Where(club => club.ClubId == clubId).AsNoTracking().FirstOrDefault();
            if (club == null) {
                return BadRequest("Club not found with the Id provided.");
            }

            // if club is public or if the club is private and the user is member, return list
            ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
            if(club.Private == false || clubUser != null) { // if user is a member of the club, clubUser will not be null here
                var readings = dbContext.Readings.Where(reading => reading.ClubId == clubId).AsNoTracking().ToList();
                return Ok(readings);
            }

            // if club is private and user isn't a member, return Unauthorized status
            return Unauthorized("user isn't authorized to attain the readings from this club.");
        }
        
        return BadRequest(ModelState);
    }

    // action method that returns all reading records associated with a club
    [HttpGet("GetAReading")]
    public async Task<ActionResult<Reading>> GetSingleReadingOfAClub([Required] int clubId, [Required] int bookId) {
        if(ModelState.IsValid){
            // ensure club exists
            var club = dbContext.Clubs.Where(club => club.ClubId == clubId).AsNoTracking().FirstOrDefault();
            if (club == null) {
                return BadRequest("Club not found with the Id provided.");
            }

            // if club is public or if the club is private and the user is member, return list
            ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
            if(club.Private == false || clubUser != null) { // if user is a member of the club, clubUser will not be null here
                var reading = dbContext.Readings.Where(reading => reading.ClubId == clubId && reading.BookId == bookId).AsNoTracking().FirstOrDefault();
                if(reading != null) {
                    return Ok(reading);
                }                
                return NotFound("Reading wasn't found.");
            }

            // if club is private and user isn't a member, return Unauthorized status
            return Unauthorized("user isn't authorized to attain the readings from this club.");
        }
        
        return BadRequest(ModelState);
    }

    // action method that updates the name and description of an existing reading
    [HttpPut("update")]
    [Authorize]
    public async Task<ActionResult<Reading>> UpdateReading([Required] int clubId, [Required] int bookId, string name, string description)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure logged in user is the club's admin
            bool? admin = await authHelpers.IsUserAdminOfClub(User, clubId);
            if (admin == null || admin == false)
            {
                return Unauthorized("User isn't authorized to create a reading for this club.");
            }

            // ensure reading exists already. Return 400 if not. 
            var reading = dbContext.Readings
                .Where(reading => reading.BookId == bookId && reading.ClubId == clubId)
                .FirstOrDefault();
            if (reading == null) {
                return BadRequest("Reading wasn't found.");
            }

            // update the name and description of the reading
            try
            {
                reading.Name = name;
                reading.Description = description;

                dbContext.SaveChanges();
                
                ReadingDTO readingDTO = new(bookId, clubId, name, description);
                return Ok(readingDTO);
            }
            catch (Exception e) {
                return StatusCode(500, "Error saving the reading to the database. \n"+e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

}