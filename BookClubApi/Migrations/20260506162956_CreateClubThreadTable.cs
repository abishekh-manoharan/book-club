using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class CreateClubThreadTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "announcement_thread",
                schema: "BookClub");

            migrationBuilder.CreateTable(
                name: "club_thread",
                schema: "BookClub",
                columns: table => new
                {
                    thread_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    parent_thread_id = table.Column<int>(type: "int", nullable: true),
                    club_id = table.Column<int>(type: "int", nullable: false),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    Text = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Heading = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pinned = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    time_posted = table.Column<DateTime>(type: "datetime", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PRIMARY", x => x.thread_id);
                    table.ForeignKey(
                        name: "FK_club_thread_club_club_id",
                        column: x => x.club_id,
                        principalSchema: "BookClub",
                        principalTable: "club",
                        principalColumn: "club_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "club_thread_ibfk_1",
                        column: x => x.user_id,
                        principalSchema: "BookClub",
                        principalTable: "user",
                        principalColumn: "user_id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "club_thread_ibfk_3",
                        column: x => x.parent_thread_id,
                        principalSchema: "BookClub",
                        principalTable: "club_thread",
                        principalColumn: "thread_id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "book_id4",
                schema: "BookClub",
                table: "club_thread",
                column: "club_id");

            migrationBuilder.CreateIndex(
                name: "idx_club_thread_tree",
                schema: "BookClub",
                table: "club_thread",
                columns: new[] { "parent_thread_id", "time_posted", "thread_id" },
                descending: new[] { false, true, true });

            migrationBuilder.CreateIndex(
                name: "idx_parent_club_thread",
                schema: "BookClub",
                table: "club_thread",
                column: "parent_thread_id");

            migrationBuilder.CreateIndex(
                name: "idx_parentBatch_club_thread",
                schema: "BookClub",
                table: "club_thread",
                columns: new[] { "parent_thread_id", "time_posted" });

            migrationBuilder.CreateIndex(
                name: "idx_root_club_threads",
                schema: "BookClub",
                table: "club_thread",
                columns: new[] { "club_id", "parent_thread_id", "time_posted", "thread_id" },
                descending: new[] { false, false, true, true });

            migrationBuilder.CreateIndex(
                name: "parent_thread_id",
                schema: "BookClub",
                table: "club_thread",
                column: "parent_thread_id");

            migrationBuilder.CreateIndex(
                name: "user_id3",
                schema: "BookClub",
                table: "club_thread",
                column: "user_id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "club_thread",
                schema: "BookClub");

            migrationBuilder.CreateTable(
                name: "announcement_thread",
                schema: "BookClub",
                columns: table => new
                {
                    announcement_thread_id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    club_id = table.Column<int>(type: "int", nullable: false),
                    parent_announcement_thread_id = table.Column<int>(type: "int", nullable: true),
                    user_id = table.Column<int>(type: "int", nullable: false),
                    Deleted = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Heading = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Pinned = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Text = table.Column<string>(type: "longtext", nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
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
    }
}
