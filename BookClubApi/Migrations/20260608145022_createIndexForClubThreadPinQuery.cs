using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class createIndexForClubThreadPinQuery : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "idx_club_thread_pinned",
                schema: "BookClub",
                table: "club_thread",
                columns: new[] { "club_id", "Pinned" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "idx_club_thread_pinned",
                schema: "BookClub",
                table: "club_thread");
        }
    }
}
