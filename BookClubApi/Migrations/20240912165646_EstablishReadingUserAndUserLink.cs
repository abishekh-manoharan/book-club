using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class EstablishReadingUserAndUserLink : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "readinguser_ibfk_1",
                schema: "BookClub",
                table: "readinguser");

            migrationBuilder.AddForeignKey(
                name: "readinguser_ibfk_1",
                schema: "BookClub",
                table: "readinguser",
                columns: new[] { "book_id", "club_id" },
                principalSchema: "BookClub",
                principalTable: "reading",
                principalColumns: new[] { "book_id", "club_id" },
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "readinguser_user_ibfk_2",
                schema: "BookClub",
                table: "readinguser",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "readinguser_ibfk_1",
                schema: "BookClub",
                table: "readinguser");

            migrationBuilder.DropForeignKey(
                name: "readinguser_user_ibfk_2",
                schema: "BookClub",
                table: "readinguser");

            migrationBuilder.AddForeignKey(
                name: "readinguser_ibfk_1",
                schema: "BookClub",
                table: "readinguser",
                columns: new[] { "book_id", "club_id" },
                principalSchema: "BookClub",
                principalTable: "reading",
                principalColumns: new[] { "book_id", "club_id" });
        }
    }
}
