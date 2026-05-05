using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class CreateAnnouncementThreadTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.RenameIndex(
                name: "user_id3",
                schema: "BookClub",
                table: "thread",
                newName: "user_id31");

            migrationBuilder.RenameIndex(
                name: "parent_thread_id",
                schema: "BookClub",
                table: "thread",
                newName: "parent_thread_id1");

            migrationBuilder.RenameIndex(
                name: "book_id4",
                schema: "BookClub",
                table: "thread",
                newName: "book_id41");

            migrationBuilder.CreateTable(
                name: "announcement_thread",
                schema: "BookClub",
                columns: table => new
                {
                    announcement_thread_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    parent_announcement_thread_id = table.Column<int>(type: "int", nullable: true),
                    club_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pinned = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    time_posted = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.announcement_thread_id);
                    table.ForeignKey(
                        name: "FK_announcement_thread_club_club_id",
                        column: x => x.club_id,
                        principalSchema: "BookClub",
                        principalTable: "club",
                        principalColumn: "club_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "announcement_thread_ibfk_1",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "announcement_thread_ibfk_3",
                        column: x => x.parent_announcement_thread_id,
                        principalSchema: "BookClub",
                        principalTable: "announcement_thread",
                        principalColumn: "announcement_thread_id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "book_id4",
                schema: "BookClub",
                table: "announcement_thread",
                column: "club_id");

            migrationBuilder.CreateIndex(
                name: "idx_announcement_thread_tree",
                schema: "BookClub",
                table: "announcement_thread",
                columns: new[] { "parent_announcement_thread_id", "time_posted", "announcement_thread_id" },
                descending: new[] { false, true, true });

            migrationBuilder.CreateIndex(
                name: "idx_parent_announcement_thread",
                schema: "BookClub",
                table: "announcement_thread",
                column: "parent_announcement_thread_id");

            migrationBuilder.CreateIndex(
                name: "idx_parentBatch_announcement_thread",
                schema: "BookClub",
                table: "announcement_thread",
                columns: new[] { "parent_announcement_thread_id", "time_posted" });

            migrationBuilder.CreateIndex(
                name: "idx_root_announcement_threads",
                schema: "BookClub",
                table: "announcement_thread",
                columns: new[] { "club_id", "parent_announcement_thread_id", "time_posted", "announcement_thread_id" },
                descending: new[] { false, false, true, true });

            migrationBuilder.CreateIndex(
                name: "parent_thread_id",
                schema: "BookClub",
                table: "announcement_thread",
                column: "parent_announcement_thread_id");

            migrationBuilder.CreateIndex(
                name: "user_id3",
                schema: "BookClub",
                table: "announcement_thread",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "announcement_thread",
                schema: "BookClub");

            migrationBuilder.RenameIndex(
                name: "user_id31",
                schema: "BookClub",
                table: "thread",
                newName: "user_id3");

            migrationBuilder.RenameIndex(
                name: "parent_thread_id1",
                schema: "BookClub",
                table: "thread",
                newName: "parent_thread_id");

            migrationBuilder.RenameIndex(
                name: "book_id41",
                schema: "BookClub",
                table: "thread",
                newName: "book_id4");
        }
    }
}
