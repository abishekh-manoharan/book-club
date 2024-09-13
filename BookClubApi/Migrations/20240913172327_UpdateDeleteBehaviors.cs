using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDeleteBehaviors : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "clubrecommendations_ibfk_1",
                schema: "BookClub",
                table: "clubrecommendations");

            migrationBuilder.DropForeignKey(
                name: "clubrecommendations_ibfk_3",
                schema: "BookClub",
                table: "clubrecommendations");

            migrationBuilder.DropForeignKey(
                name: "joinrequest_ibfk_1",
                schema: "BookClub",
                table: "JoinRequest");

            migrationBuilder.DropForeignKey(
                name: "joinrequest_ibfk_2",
                schema: "BookClub",
                table: "JoinRequest");

            migrationBuilder.DropForeignKey(
                name: "pollbook_ibfk_1",
                schema: "BookClub",
                table: "pollbook");

            migrationBuilder.DropForeignKey(
                name: "pollbook_ibfk_2",
                schema: "BookClub",
                table: "pollbook");

            migrationBuilder.DropForeignKey(
                name: "polluser_ibfk_1",
                schema: "BookClub",
                table: "polluser");

            migrationBuilder.DropForeignKey(
                name: "polluser_ibfk_2",
                schema: "BookClub",
                table: "polluser");

            migrationBuilder.DropForeignKey(
                name: "reading_ibfk_1",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.DropForeignKey(
                name: "reading_ibfk_2",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.DropForeignKey(
                name: "userbook_ibfk_1",
                schema: "BookClub",
                table: "UserBook");

            migrationBuilder.DropForeignKey(
                name: "userbook_ibfk_2",
                schema: "BookClub",
                table: "UserBook");

            migrationBuilder.AddForeignKey(
                name: "clubrecommendations_ibfk_1",
                schema: "BookClub",
                table: "clubrecommendations",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "clubrecommendations_ibfk_3",
                schema: "BookClub",
                table: "clubrecommendations",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "joinrequest_ibfk_1",
                schema: "BookClub",
                table: "JoinRequest",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "joinrequest_ibfk_2",
                schema: "BookClub",
                table: "JoinRequest",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "pollbook_ibfk_1",
                schema: "BookClub",
                table: "pollbook",
                column: "poll_id",
                principalSchema: "BookClub",
                principalTable: "poll",
                principalColumn: "poll_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "pollbook_ibfk_2",
                schema: "BookClub",
                table: "pollbook",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "polluser_ibfk_1",
                schema: "BookClub",
                table: "polluser",
                column: "poll_id",
                principalSchema: "BookClub",
                principalTable: "poll",
                principalColumn: "poll_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "polluser_ibfk_2",
                schema: "BookClub",
                table: "polluser",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "reading_ibfk_1",
                schema: "BookClub",
                table: "reading",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "reading_ibfk_2",
                schema: "BookClub",
                table: "reading",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "userbook_ibfk_1",
                schema: "BookClub",
                table: "UserBook",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "userbook_ibfk_2",
                schema: "BookClub",
                table: "UserBook",
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
                name: "clubrecommendations_ibfk_1",
                schema: "BookClub",
                table: "clubrecommendations");

            migrationBuilder.DropForeignKey(
                name: "clubrecommendations_ibfk_3",
                schema: "BookClub",
                table: "clubrecommendations");

            migrationBuilder.DropForeignKey(
                name: "joinrequest_ibfk_1",
                schema: "BookClub",
                table: "JoinRequest");

            migrationBuilder.DropForeignKey(
                name: "joinrequest_ibfk_2",
                schema: "BookClub",
                table: "JoinRequest");

            migrationBuilder.DropForeignKey(
                name: "pollbook_ibfk_1",
                schema: "BookClub",
                table: "pollbook");

            migrationBuilder.DropForeignKey(
                name: "pollbook_ibfk_2",
                schema: "BookClub",
                table: "pollbook");

            migrationBuilder.DropForeignKey(
                name: "polluser_ibfk_1",
                schema: "BookClub",
                table: "polluser");

            migrationBuilder.DropForeignKey(
                name: "polluser_ibfk_2",
                schema: "BookClub",
                table: "polluser");

            migrationBuilder.DropForeignKey(
                name: "reading_ibfk_1",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.DropForeignKey(
                name: "reading_ibfk_2",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.DropForeignKey(
                name: "userbook_ibfk_1",
                schema: "BookClub",
                table: "UserBook");

            migrationBuilder.DropForeignKey(
                name: "userbook_ibfk_2",
                schema: "BookClub",
                table: "UserBook");

            migrationBuilder.AddForeignKey(
                name: "clubrecommendations_ibfk_1",
                schema: "BookClub",
                table: "clubrecommendations",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id");

            migrationBuilder.AddForeignKey(
                name: "clubrecommendations_ibfk_3",
                schema: "BookClub",
                table: "clubrecommendations",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id");

            migrationBuilder.AddForeignKey(
                name: "joinrequest_ibfk_1",
                schema: "BookClub",
                table: "JoinRequest",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id");

            migrationBuilder.AddForeignKey(
                name: "joinrequest_ibfk_2",
                schema: "BookClub",
                table: "JoinRequest",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "pollbook_ibfk_1",
                schema: "BookClub",
                table: "pollbook",
                column: "poll_id",
                principalSchema: "BookClub",
                principalTable: "poll",
                principalColumn: "poll_id");

            migrationBuilder.AddForeignKey(
                name: "pollbook_ibfk_2",
                schema: "BookClub",
                table: "pollbook",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id");

            migrationBuilder.AddForeignKey(
                name: "polluser_ibfk_1",
                schema: "BookClub",
                table: "polluser",
                column: "poll_id",
                principalSchema: "BookClub",
                principalTable: "poll",
                principalColumn: "poll_id");

            migrationBuilder.AddForeignKey(
                name: "polluser_ibfk_2",
                schema: "BookClub",
                table: "polluser",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "reading_ibfk_1",
                schema: "BookClub",
                table: "reading",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id");

            migrationBuilder.AddForeignKey(
                name: "reading_ibfk_2",
                schema: "BookClub",
                table: "reading",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id");

            migrationBuilder.AddForeignKey(
                name: "userbook_ibfk_1",
                schema: "BookClub",
                table: "UserBook",
                column: "book_id",
                principalSchema: "BookClub",
                principalTable: "book",
                principalColumn: "book_id");

            migrationBuilder.AddForeignKey(
                name: "userbook_ibfk_2",
                schema: "BookClub",
                table: "UserBook",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id");
        }
    }
}
