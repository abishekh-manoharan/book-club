using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class threadIndexesForBatchOfParentThreads : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "idx_parentBatch_threads",
                schema: "BookClub",
                table: "thread",
                columns: new[] { "parent_thread_id", "time_posted" });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropIndex(
                name: "idx_parentBatch_threads",
                schema: "BookClub",
                table: "thread");
        }
    }
}
