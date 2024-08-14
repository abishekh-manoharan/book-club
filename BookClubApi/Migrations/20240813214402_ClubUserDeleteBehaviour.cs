using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class ClubUserDeleteBehaviour : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "clubuser_ibfk_1",
                schema: "BookClub",
                table: "ClubUser");

            migrationBuilder.DropForeignKey(
                name: "clubuser_ibfk_2",
                schema: "BookClub",
                table: "ClubUser");

            migrationBuilder.AddForeignKey(
                name: "clubuser_ibfk_1",
                schema: "BookClub",
                table: "ClubUser",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "clubuser_ibfk_2",
                schema: "BookClub",
                table: "ClubUser",
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
                name: "clubuser_ibfk_1",
                schema: "BookClub",
                table: "ClubUser");

            migrationBuilder.DropForeignKey(
                name: "clubuser_ibfk_2",
                schema: "BookClub",
                table: "ClubUser");

            migrationBuilder.AddForeignKey(
                name: "clubuser_ibfk_1",
                schema: "BookClub",
                table: "ClubUser",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id");

            migrationBuilder.AddForeignKey(
                name: "clubuser_ibfk_2",
                schema: "BookClub",
                table: "ClubUser",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id");
        }
    }
}
