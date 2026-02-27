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
[Authorize]
public class ProfileController : ControllerBase
{

    private UserManager<ApplicationUser> userManager;
    private BookClubContext dbContext;
    private IAuthHelpers authHelpers;
    private IClubService clubService;
    private IBookService bookService;

    public ProfileController(UserManager<ApplicationUser> userManager, SignInManager<ApplicationUser> signInManager, BookClubContext dbContext, IAuthHelpers authHelpers, IClubService clubService, IBookService bookService)
    {
        this.userManager = userManager;
        this.dbContext = dbContext;
        this.authHelpers = authHelpers;
        this.clubService = clubService;
        this.bookService = bookService;
    }

    // action method to update the user's information: fname, lname, bio, profileimg
    [HttpPut("update")]
    public async Task<ActionResult<UserDTO>> Update(ProfileUpdateDTO updatedProfile)
    {
        // retrieve associated User class
        User? user = await authHelpers.GetUserClassOfLoggedInUser(User);

        if (user != null)
        {
            // update user instance's properties to request specifications
            user.Bio = updatedProfile.Bio;
            user.FName = updatedProfile.FName;
            user.LName = updatedProfile.LName;
            user.ProfileImg = updatedProfile.ProfileImg;

            dbContext.Users.Update(user);
            dbContext.SaveChanges();

            UserDTO userDTO = new(user.UserId, user.Bio, user.FName, user.LName, user.ProfileImg, user.AspnetusersId);
            return Ok(userDTO);
        }
        return BadRequest("User instance associated with AspNetUser class not found.");
    }

    [HttpPost("addFavourite")]
    public async Task<ActionResult<UserBookDTO>> AddFavourite(Book book)
    {
        if (ModelState.IsValid)
        {
            // retrieve associated User class
            User? user = await authHelpers.GetUserClassOfLoggedInUser(User);

            if (user != null)
            {
                // add book to db if not already there
                await bookService.AddBookToDbIfNeeded(book);

                // attempt to create new UserBook object
                UserBook userBook = new((int)book.BookId!, user.UserId, DateTime.Now);

                try
                {
                    dbContext.UserBooks.Add(userBook);
                    dbContext.SaveChanges();

                    return Ok(new UserBookDTO(userBook.BookId, userBook.UserId, userBook.DateAdded));
                }
                catch (DbUpdateException dbe)
                {
                    if (dbe.InnerException != null && dbe.InnerException.Message.Contains("Duplicate"))
                    {
                        return Conflict("Book already added to favourites.");
                    }
                    else if (dbe.InnerException != null && dbe.InnerException.Message.Contains("foreign"))
                    {
                        return BadRequest("user or book not found.");
                    }
                    return BadRequest("Error occured while trying to add book to user favourites. " + dbe.InnerException?.Message);
                }
                catch (Exception e) { return BadRequest("Error occured while trying to add book to user favourites. " + e.InnerException?.Message); }
            }
            return BadRequest("User instance associated with AspNetUser class not found.");
        }
        return BadRequest(ModelState);
    }

    [HttpDelete("removeFavourite")]
    public async Task<ActionResult<UserBookDTO>> RemoveFavourite([Required] int bookId)
    {
        if (ModelState.IsValid)
        {
            User? user = await authHelpers.GetUserClassOfLoggedInUser(User);

            // get the associated userbook object
            var userbook = dbContext.UserBooks.Where(userbook => userbook.BookId == bookId && userbook.UserId == user!.UserId).AsNoTracking().FirstOrDefault();

            // ensure userbook object exists. return not found otherwise.
            if (userbook != null)
            {
                try
                {
                    dbContext.UserBooks.Remove(userbook);
                    dbContext.SaveChanges();

                    return Ok(new UserBookDTO(userbook.BookId, userbook.UserId, userbook.DateAdded));
                }
                catch (Exception e)
                {
                    return Problem(e.InnerException?.Message);
                }
            }
            return NotFound("Book not found in user's favourites.");
        }
        return BadRequest(ModelState);
    }

    [HttpGet("getFavourites")]
    public ActionResult<List<UserBookDTO>> GetUsersFavourites([Required] int userId)
    {
        if (ModelState.IsValid)
        {
            List<UserBook> ubs = dbContext.UserBooks.Where(ub => ub.UserId == userId).AsNoTracking().ToList();
            List<UserBookDTO> ubsDTOs = [];

            foreach (UserBook ub in ubs)
            {
                ubsDTOs.Add(new UserBookDTO(ub.BookId, ub.UserId, ub.DateAdded));
            }

            return Ok(ubsDTOs);
        }
        return BadRequest(ModelState);
    }

    // action method that returns all clubs associated with a user
    [HttpGet("getClubs")]
    public ActionResult<List<ClubDTO>> GetClubs([Required] int userId)
    {
        if (ModelState.IsValid)
        {
            // get clubuser objects associated with the user to determine clubs associated with user
            var clubUsers = dbContext.ClubUsers
                .Where(clubUser => clubUser.UserId == userId)
                .ToList();

            // forming a list of all associated club objects associated with the previously attained clubUser objects
            List<ClubDTO> clubs = [];
            foreach (ClubUser clubUser in clubUsers)
            {
                Club foundClub = dbContext.Clubs
                    .Where(club => club.ClubId == clubUser.ClubId)
                    .AsNoTracking()
                    .First();

                // map found clubs to DTOP
                ClubDTO foundClubDTO = new(foundClub.ClubId, foundClub.Name, foundClub.Description, foundClub.ProfileImg, foundClub.Private, foundClub.UserId);

                clubs.Add(foundClubDTO);
            }

            // returning retrieved clubs from 
            return Ok(clubs);
        }
        return BadRequest(ModelState);
    }
}