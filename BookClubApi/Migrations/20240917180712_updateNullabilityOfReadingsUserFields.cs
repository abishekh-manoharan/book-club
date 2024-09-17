using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class updateNullabilityOfReadingsUserFields : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "readinguser_ibfk_2",
                schema: "BookClub",
                table: "readinguser");

            migrationBuilder.AlterColumn<int>(
                name: "progresstype_id",
                schema: "BookClub",
                table: "readinguser",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "progress",
                schema: "BookClub",
                table: "readinguser",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "readinguser_ibfk_2",
                schema: "BookClub",
                table: "readinguser",
                column: "progresstype_id",
                principalSchema: "BookClub",
                principalTable: "progressType",
                principalColumn: "progresstype_id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "readinguser_ibfk_2",
                schema: "BookClub",
                table: "readinguser");

            migrationBuilder.AlterColumn<int>(
                name: "progresstype_id",
                schema: "BookClub",
                table: "readinguser",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "progress",
                schema: "BookClub",
                table: "readinguser",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "readinguser_ibfk_2",
                schema: "BookClub",
                table: "readinguser",
                column: "progresstype_id",
                principalSchema: "BookClub",
                principalTable: "progressType",
                principalColumn: "progresstype_id");
        }
    }
}
