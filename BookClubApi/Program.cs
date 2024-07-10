using BookClubApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BookClubApi.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;


var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// builder.Services.Configure<IdentityOptions>(options => options.)

builder.Services.AddDbContext<BookClubContext>(options =>
    options.UseMySQL(builder.Configuration.GetConnectionString("BookClubDB")!)
);

// builder.Services.AddIdentity<IdentityUser, IdentityRole>().AddEntityFrameworkStores<BookClubContext>();

builder.Services.AddIdentityApiEndpoints<IdentityUser>().AddEntityFrameworkStores<BookClubContext>();

var app = builder.Build();

app.MapIdentityApi<IdentityUser>();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();

app.Run();

// 1. dotnet ef migrations add UpdateTable  // adds a migration
// 2. dotnet ef database update // updates DB