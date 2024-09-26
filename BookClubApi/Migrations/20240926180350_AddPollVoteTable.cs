using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class AddPollVoteTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "pollvote",
                schema: "BookClub",
                columns: table => new
                {
                    poll_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.poll_id, x.user_id });
                    table.ForeignKey(
                        name: "pollvote_ibfk_1",
                        column: x => x.poll_id,
                        principalSchema: "BookClub",
                        principalTable: "poll",
                        principalColumn: "poll_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "pollvote_ibfk_2",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySQL:Charset", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_pollvote_user_id",
                schema: "BookClub",
                table: "pollvote",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "pollvote",
                schema: "BookClub");
        }
    }
}
