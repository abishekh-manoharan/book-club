using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class CreateMeetingRSVPTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "meeting_rsvp",
                schema: "BookClub",
                columns: table => new
                {
                    meeting_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    rsvp = table.Column<string>(type: "varchar(20)", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4")
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => new { x.meeting_id, x.user_id });
                    table.ForeignKey(
                        name: "meetingrsvp_ibfk_1",
                        column: x => x.meeting_id,
                        principalSchema: "BookClub",
                        principalTable: "meetings",
                        principalColumn: "meeting_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "meetingrsvp_ibfk_2",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "idx_meetingrsvp_user",
                schema: "BookClub",
                table: "meeting_rsvp",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "meeting_rsvp",
                schema: "BookClub");
        }
    }
}
