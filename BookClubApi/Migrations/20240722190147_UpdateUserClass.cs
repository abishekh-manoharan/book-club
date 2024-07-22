using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateUserClass : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "email",
                schema: "BookClub",
                table: "user");

            migrationBuilder.DropColumn(
                name: "hash",
                schema: "BookClub",
                table: "user");

            migrationBuilder.DropColumn(
                name: "salt",
                schema: "BookClub",
                table: "user");

            migrationBuilder.DropColumn(
                name: "username",
                schema: "BookClub",
                table: "user");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "email",
                schema: "BookClub",
                table: "user",
                type: "varchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "hash",
                schema: "BookClub",
                table: "user",
                type: "varchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "salt",
                schema: "BookClub",
                table: "user",
                type: "varchar(200)",
                maxLength: 200,
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "username",
                schema: "BookClub",
                table: "user",
                type: "varchar(50)",
                maxLength: 50,
                nullable: true);
        }
    }
}
