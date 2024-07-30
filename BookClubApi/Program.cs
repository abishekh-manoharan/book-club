using BookClubApi.Models;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using BookClubApi.Data;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity;
using BookClubApi;

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

builder.Services.AddIdentity<ApplicationUser, IdentityRole>()
    .AddEntityFrameworkStores<BookClubContext>();

builder.Services.Configure<IdentityOptions>(options =>{
    options.Password.RequiredLength = 8;
    options.User.RequireUniqueEmail = true;
});

builder.Services.AddCors(options => {
    options.AddPolicy(
            name: "GeneralCorsPolicyWithCreds",
            policy => {
                policy.WithOrigins([BookClubApi.Constants.FE_URL])
                    .AllowCredentials();
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
