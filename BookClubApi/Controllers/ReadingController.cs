using System.ComponentModel.DataAnnotations;
using System.Data.Common;
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
    public async Task<ActionResult<Reading>> CreateReading([FromBody] ReadingCreationValDTO readingCreationValDTO)
    {
        // ensure required params are included
        if (ModelState.IsValid)
        {
            // ensure logged in user is the club's admin
            bool? admin = await authHelpers.IsUserAdminOfClub(User, (int) readingCreationValDTO.ClubId!);
            if (admin == null || admin == false)
            {
                return Unauthorized("User isn't authorized to create a reading for this club.");
            }

            // save book to db if it doesn't exist already
            var searchedBook = dbContext.Books
                .Where(dbBook => dbBook.BookId == readingCreationValDTO.BookId)
                .AsNoTracking()
                .FirstOrDefault();
            if (searchedBook == null)
            {
                dbContext.Books
                    .Add(new Book(
                        readingCreationValDTO.BookId,
                        readingCreationValDTO.Cover_Id,
                        readingCreationValDTO.Title,
                        readingCreationValDTO.AuthorName,
                        readingCreationValDTO.Ol_key,
                        readingCreationValDTO.FirstPublishYear,
                        readingCreationValDTO.NumberOfPagesMedian,
                        readingCreationValDTO.RatingsAverage
                    ));
                await dbContext.SaveChangesAsync();
            }

            // create reading
            try
            {
                Reading newReading = new()
                {
                    BookId = (int)readingCreationValDTO.BookId!,
                    ClubId = (int) readingCreationValDTO.ClubId!,
                    Name = readingCreationValDTO.Name,
                    Description = readingCreationValDTO.Description,
                    Status = "started"
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
            catch (Exception e)
            {
                // handling all other errors when trying to save to db
                return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that returns all reading records associated with a club
    [HttpGet("GetAllReadings")]
    public async Task<ActionResult<List<Reading>>> GetAllReadingsOfAClub([Required] int clubId)
    {
        if (ModelState.IsValid)
        {
            // ensure club exists
            var club = dbContext.Clubs.Where(club => club.ClubId == clubId).AsNoTracking().FirstOrDefault();
            if (club == null)
            {
                return BadRequest("Club not found with the Id provided.");
            }

            // if club is public or if the club is private and the user is member, return list
            ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
            if (club.Private == false || clubUser != null)
            { // if user is a member of the club, clubUser will not be null here
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
    public async Task<ActionResult<Reading>> GetSingleReadingOfAClub([Required] int clubId, [Required] int bookId)
    {
        if (ModelState.IsValid)
        {
            // ensure club exists
            var club = dbContext.Clubs.Where(club => club.ClubId == clubId).AsNoTracking().FirstOrDefault();
            if (club == null)
            {
                return BadRequest("Club not found with the Id provided.");
            }

            // if club is public or if the club is private and the user is member, return list
            ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
            if (club.Private == false || clubUser != null)
            { // if user is a member of the club, clubUser will not be null here
                var reading = dbContext.Readings.Where(reading => reading.ClubId == clubId && reading.BookId == bookId).AsNoTracking().FirstOrDefault();
                if (reading != null)
                {
                    return Ok(reading);
                }
                return NotFound("Reading wasn't found.");
            }

            // if club is private and user isn't a member, return Unauthorized status
            return Unauthorized("user isn't authorized to attain the readings from this club.");
        }

        return BadRequest(ModelState);
    }

    // action method that updates the name, description, and status of an existing reading
    [HttpPut("update")]
    [Authorize]
    public async Task<ActionResult<Reading>> UpdateReading([Required] int clubId, [Required] int bookId, string name, string description, string status)
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
            if (reading == null)
            {
                return BadRequest("Reading wasn't found.");
            }

            // update the name and description of the reading
            try
            {
                reading.Name = name;
                reading.Description = description;
                reading.Status = status;

                dbContext.SaveChanges();

                ReadingDTO readingDTO = new(bookId, clubId, name, description, status);
                return Ok(readingDTO);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that deletes the specified reading record
    [HttpDelete("delete")]
    [Authorize]
    public async Task<ActionResult<Reading>> DeleteReading([Required] int clubId, [Required] int bookId)
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
            if (reading == null)
            {
                return BadRequest("Reading wasn't found.");
            }

            // delete the reading 
            try
            {
                dbContext.Readings.Remove(reading);
                dbContext.SaveChanges();

                return Ok(reading);
            }
            catch (Exception e)
            {
                return StatusCode(500, "Error deleting the reading\n" + e.Message);
            }
        }
        // if a required parameter is not included
        return BadRequest(ModelState);
    }

    // action method that allows a club member to opt into a specified reading
    [HttpPost("OptIntoReading")]
    [Authorize]
    public async Task<ActionResult<ReadingUserDTO>> OptIntoReading([Required] int clubId, [Required] int bookId)
    {
        if (ModelState.IsValid)
        {
            // ensure logged in user is member of club
            ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
            if (clubUser != null)
            {
                // ensure reading exists already
                var reading = dbContext.Readings
                    .Where(reading => reading.BookId == bookId && reading.ClubId == clubId)
                    .AsNoTracking()
                    .FirstOrDefault();
                if (reading != null) // if reading exists
                {
                    // ensure reading isn't concluded
                    if (reading.Status != "concluded")
                    {
                        // create readinguser record for user
                        try
                        {
                            Readinguser newReadingUser = new(clubUser.UserId, bookId, clubId, 0, 1);
                            dbContext.Readingusers.Add(newReadingUser);
                            dbContext.SaveChanges();

                            ReadingUserDTO readingUserDTO = new(clubUser.UserId, bookId, clubId, 0, 1);

                            return Ok(readingUserDTO);
                        }
                        catch (DbUpdateException dbe)
                        {
                            // if reading exists already, return 409 conflict status
                            if (dbe.InnerException!.Message.Contains("Duplicate"))
                            {
                                return Conflict("User has already opted into reading.");
                            }
                        }
                        catch (Exception e)
                        {
                            System.Console.WriteLine("Exception e");
                            // handling all other errors when trying to save to db
                            return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
                        }
                    }
                    return BadRequest("Unable to opt into reading. Reading was concluded.");
                }
                return NotFound("Reading wasn't found.");
            }
            return NotFound("User isn't member of the club.");
        }
        return BadRequest(ModelState);
    }

    // action method that allows a club member to opt out of a specified reading
    [HttpPost("OptOutOfReading")]
    [Authorize]
    public async Task<ActionResult<Reading>> OptOutOfReading([Required] int clubId, [Required] int bookId)
    {
        if (ModelState.IsValid)
        {
            // ensure logged in user is member of club
            ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
            if (clubUser != null)
            {
                // ensure reading exists already
                var reading = dbContext.Readings
                    .Where(reading => reading.BookId == bookId && reading.ClubId == clubId)
                    .AsNoTracking()
                    .FirstOrDefault();
                if (reading != null) // if reading exists
                {
                    // ensure reading isn't concluded
                    if (reading.Status != "concluded")
                    {
                        var readingUser = dbContext.Readingusers
                            .Where(readingUser => readingUser.BookId == bookId
                                && readingUser.ClubId == clubId
                                && readingUser.UserId == clubUser.UserId)
                            .AsNoTracking()
                            .FirstOrDefault();

                        if (readingUser != null)
                        {
                            dbContext.Readingusers.Remove(readingUser);
                            dbContext.SaveChanges();

                            return Ok();
                        }

                        return NotFound("User hasn't opted into the reading.");
                    }
                    return BadRequest("Unable to opt into reading. Reading was concluded.");
                }
                return NotFound("Reading wasn't found.");
            }
            return NotFound("User isn't member of the club.");
        }
        return BadRequest(ModelState);
    }

    // action method that allows reading members to update their progress 
    [HttpPut("UpdateReadingProgress")]
    [Authorize]
    public async Task<ActionResult<Reading>> UpdateReadingProgress([Required] int clubId, [Required] int bookId, [Required] int Progress, [Required] int ProgresstypeId)
    {
        if (ModelState.IsValid)
        {
            // ensure logged in user is member of club
            ClubUser? clubUser = await authHelpers.GetClubUserOfLoggedInUser(User, clubId);
            if (clubUser != null)
            {
                // ensure reading exists already
                var reading = dbContext.Readings
                    .Where(reading => reading.BookId == bookId && reading.ClubId == clubId)
                    .AsNoTracking()
                    .FirstOrDefault();
                if (reading != null) // if reading exists
                {
                    // ensure reading isn't concluded
                    if (reading.Status != "concluded")
                    {
                        var readingUser = dbContext.Readingusers
                            .Where(readingUser => readingUser.BookId == bookId
                                && readingUser.ClubId == clubId
                                && readingUser.UserId == clubUser.UserId)
                            .FirstOrDefault();

                        // ensure user has opted into the reading
                        if (readingUser != null)
                        {
                            try
                            {
                                // update progress
                                readingUser.Progress = Progress;
                                readingUser.ProgresstypeId = ProgresstypeId;

                                dbContext.SaveChanges();

                                ReadingUserDTO readingUserDTO = new(clubUser.UserId, readingUser.BookId, readingUser.ClubId, readingUser.Progress, readingUser.ProgresstypeId);
                                return Ok(readingUserDTO);
                            }
                            catch (DbUpdateException e)
                            {
                                if (e.InnerException!.Message.Contains("foreign key constraint fails"))
                                {
                                    return BadRequest("FK constraint violated. it's possible that the progress type was invalid.");
                                }
                                return StatusCode(500, "Error saving the reading to the database. \n" + e.InnerException.Message);
                            }
                            catch (Exception e)
                            {
                                return StatusCode(500, "Error saving the reading to the database. \n" + e.Message);
                            }
                        }

                        return NotFound("User hasn't opted into the reading.");
                    }
                    return BadRequest("Unable to update progress for the reading. Reading was concluded.");
                }
                return NotFound("Reading wasn't found.");
            }
            return NotFound("User isn't member of the club.");
        }
        return BadRequest(ModelState);
    }
}