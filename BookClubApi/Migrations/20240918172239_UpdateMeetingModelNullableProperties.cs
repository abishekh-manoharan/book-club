using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateMeetingModelNullableProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "meetings_ibfk_1",
                schema: "BookClub",
                table: "meetings");

            migrationBuilder.AlterColumn<DateTime>(
                name: "start_time",
                schema: "BookClub",
                table: "meetings",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "club_id",
                schema: "BookClub",
                table: "meetings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "book_id",
                schema: "BookClub",
                table: "meetings",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "meetings_ibfk_1",
                schema: "BookClub",
                table: "meetings",
                columns: new[] { "book_id", "club_id" },
                principalSchema: "BookClub",
                principalTable: "reading",
                principalColumns: new[] { "book_id", "club_id" },
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "meetings_ibfk_1",
                schema: "BookClub",
                table: "meetings");

            migrationBuilder.AlterColumn<DateTime>(
                name: "start_time",
                schema: "BookClub",
                table: "meetings",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<int>(
                name: "club_id",
                schema: "BookClub",
                table: "meetings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "book_id",
                schema: "BookClub",
                table: "meetings",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "meetings_ibfk_1",
                schema: "BookClub",
                table: "meetings",
                columns: new[] { "book_id", "club_id" },
                principalSchema: "BookClub",
                principalTable: "reading",
                principalColumns: new[] { "book_id", "club_id" });
        }
    }
}
