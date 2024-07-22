
using BookClubApi.Models;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace BookClubApi.Controllers;

[Route("[controller]")]
public class AuthController : ControllerBase {
    private UserManager<ApplicationUser> userManager;

    public AuthController(UserManager<ApplicationUser> userManager) {
        this.userManager = userManager;
    }

    // [HttpGet("users")]
    // public IEnumerable<ApplicationUser> Get() { 

    // }

    [HttpPost("createUser")]
    public async Task<bool> CreateUser(ApplicationUser user, string password) {
        var result = await userManager.CreateAsync(user, password);
        return result.Succeeded;
    }

    [HttpGet]
    public string GetBody(string name, int id) {
        return name + id;
    }
}