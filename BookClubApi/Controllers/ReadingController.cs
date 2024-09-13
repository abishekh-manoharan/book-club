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
}