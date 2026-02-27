using BookClubApi.Data;
using BookClubApi.DTOs;
using BookClubApi.Models;
using BookClubApi.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class BookController : ControllerBase
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;

    public BookController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers, IClubService clubService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
        this.clubService = clubService;
    }

    // Action method that returns a book record based on provided bookId
    [HttpGet("getOneBook")]
    public ActionResult<BookDTO> GetOneClub([FromQuery] int BookId)
    {

        Book? book = dbContext.Books
            .Where(book => book.BookId == BookId)
            .AsNoTracking()
            .FirstOrDefault();

        if (book != null)
        {
            BookDTO bookDTO = new((int)book.BookId!, book.Cover_Id, book.Title, book.AuthorName ?? "", book.Ol_key, book.FirstPublishYear, book.NumberOfPagesMedian, book.RatingsAverage);
            return Ok(bookDTO);
        }

        return NotFound("Book with the id not found");
    }

}
