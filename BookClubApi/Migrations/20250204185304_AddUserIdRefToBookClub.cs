using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class AddUserIdRefToBookClub : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "UserId",
                schema: "BookClub",
                table: "club",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_club_UserId",
                schema: "BookClub",
                table: "club",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_club_user_UserId",
                schema: "BookClub",
                table: "club",
                column: "UserId",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_club_user_UserId",
                schema: "BookClub",
                table: "club");

            migrationBuilder.DropIndex(
                name: "IX_club_UserId",
                schema: "BookClub",
                table: "club");

            migrationBuilder.DropColumn(
                name: "UserId",
                schema: "BookClub",
                table: "club");
        }
    }
}
