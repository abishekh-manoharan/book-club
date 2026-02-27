namespace BookClubApi.Services;

using BookClubApi.Data;
using BookClubApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;

public class BookService : IBookService
{
    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;

    public BookService(UserManager<ApplicationUser> userManager, BookClubContext dbContext, IAuthHelpers authHelpers)
    {
        this.dbContext = dbContext;
        this.userManager = userManager;
        this.authHelpers = authHelpers;
    }

    public async Task AddBookToDbIfNeeded(Book book) {
            
            // save book to db if it doesn't exist already
            var searchedBook = dbContext.Books
                .Where(dbBook => dbBook.BookId == book.BookId)
                .AsNoTracking()
                .FirstOrDefault();
            if (searchedBook == null)
            {
                dbContext.Books
                    .Add(book);
                await dbContext.SaveChangesAsync();
            }
    }

}