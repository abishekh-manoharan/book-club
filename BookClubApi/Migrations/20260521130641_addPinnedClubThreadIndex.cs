using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class addPinnedClubThreadIndex : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "idx_pinnedParentBatch_club_thread",
                schema: "BookClub",
                table: "club_thread",
                columns: new[] { "club_id", "parent_thread_id", "Pinned" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "idx_pinnedParentBatch_club_thread",
                schema: "BookClub",
                table: "club_thread");
        }
    }
}
