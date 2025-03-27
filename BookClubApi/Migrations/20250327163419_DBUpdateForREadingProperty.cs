using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class DBUpdateForREadingProperty : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "startDate",
                schema: "BookClub",
                table: "reading"
            );

            migrationBuilder.AddColumn<DateTime>(
                name: "StartDate",
                schema: "BookClub",
                table: "reading"
            );
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "StartDate",
                schema: "BookClub",
                table: "reading"
            );

            migrationBuilder.AddColumn<DateTime>(
                name: "startDate",
                schema: "BookClub",
                table: "reading"
            );
        }
    }
}
