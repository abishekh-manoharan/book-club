using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class threadIndexesForBatchRetrieve : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "idx_parent",
                schema: "BookClub",
                table: "thread",
                column: "parent_thread_id");

            migrationBuilder.CreateIndex(
                name: "idx_root_threads",
                schema: "BookClub",
                table: "thread",
                columns: new[] { "club_id", "book_id", "parent_thread_id", "time_posted", "thread_id" },
                descending: new[] { false, false, false, true, true });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "idx_parent",
                schema: "BookClub",
                table: "thread");

            migrationBuilder.DropIndex(
                name: "idx_root_threads",
                schema: "BookClub",
                table: "thread");
        }
    }
}
