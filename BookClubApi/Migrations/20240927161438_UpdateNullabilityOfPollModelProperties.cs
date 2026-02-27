using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNullabilityOfPollModelProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "poll_ibfk_1",
                schema: "BookClub",
                table: "poll");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                schema: "BookClub",
                table: "poll",
                type: "varchar(255)",
                maxLength: 255,
                nullable: false,
                defaultValue: "",
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255,
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_date",
                schema: "BookClub",
                table: "poll",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "club_id",
                schema: "BookClub",
                table: "poll",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "poll_ibfk_1",
                schema: "BookClub",
                table: "poll",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "poll_ibfk_1",
                schema: "BookClub",
                table: "poll");

            migrationBuilder.AlterColumn<string>(
                name: "name",
                schema: "BookClub",
                table: "poll",
                type: "varchar(255)",
                maxLength: 255,
                nullable: true,
                oldClrType: typeof(string),
                oldType: "varchar(255)",
                oldMaxLength: 255);

            migrationBuilder.AlterColumn<DateTime>(
                name: "created_date",
                schema: "BookClub",
                table: "poll",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AlterColumn<int>(
                name: "club_id",
                schema: "BookClub",
                table: "poll",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "poll_ibfk_1",
                schema: "BookClub",
                table: "poll",
                column: "club_id",
                principalSchema: "BookClub",
                principalTable: "club",
                principalColumn: "club_id");
        }
    }
}
