using BookClubApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BookClubApi.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using BookClubApi.Services;
using Microsoft.AspNetCore.Mvc.Authorization;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.Authentication.Cookies;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
builder.Services.AddControllers().AddJsonOptions(x =>
   x.JsonSerializerOptions.ReferenceHandler = System.Text.Json.Serialization.ReferenceHandler.Preserve);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.Configure<IdentityOptions>(options => options.)

builder.Services.AddDbContext<BookClubContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("BookClubDB")!)
        .EnableSensitiveDataLogging()
);

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<BookClubContext>()
    .AddDefaultTokenProviders();

builder.Services.Configure<IdentityOptions>(options =>
{
    options.Password.RequiredLength = 8;
    options.User.RequireUniqueEmail = true;
});

builder.Services.AddScoped<IAuthHelpers, AuthHelpers>();
builder.Services.AddScoped<IClubService, ClubService>();
builder.Services.AddScoped<IBookService, BookService>();

builder.Services.ConfigureApplicationCookie(options =>
{
    options.ExpireTimeSpan = TimeSpan.FromDays(30);
    options.SlidingExpiration = true;
    options.Cookie.HttpOnly = true;
    // ensuring [Auhtorize] attribute returns a 401 error
    options.Events.OnRedirectToLogin = context =>
    {
        context.Response.StatusCode = StatusCodes.Status401Unauthorized;
        return Task.CompletedTask;
    };
});


builder.Services.AddCors(options =>
{
    options.AddPolicy(
            name: "GeneralCorsPolicyWithCreds",
            policy =>
            {
                policy.WithOrigins([BookClubApi.Constants.FE_URL])
                    .AllowCredentials()
                    .WithHeaders(["Content-Type"])
                    .WithMethods("GET", "POST", "PUT", "DELETE");
            }
        );
});

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

app.UseCors("GeneralCorsPolicyWithCreds");

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// 1. dotnet ef migrations add UpdateTable  // adds a migration
// 2. dotnet ef database update // updates DB

