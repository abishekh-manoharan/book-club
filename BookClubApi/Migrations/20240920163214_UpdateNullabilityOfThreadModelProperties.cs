using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNullabilityOfThreadModelProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "thread_ibfk_1",
                schema: "BookClub",
                table: "thread");

            migrationBuilder.DropForeignKey(
                name: "thread_ibfk_2",
                schema: "BookClub",
                table: "thread");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                schema: "BookClub",
                table: "thread",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "club_id",
                schema: "BookClub",
                table: "thread",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<int>(
                name: "book_id",
                schema: "BookClub",
                table: "thread",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "thread_ibfk_1",
                schema: "BookClub",
                table: "thread",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "thread_ibfk_2",
                schema: "BookClub",
                table: "thread",
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
                name: "thread_ibfk_1",
                schema: "BookClub",
                table: "thread");

            migrationBuilder.DropForeignKey(
                name: "thread_ibfk_2",
                schema: "BookClub",
                table: "thread");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                schema: "BookClub",
                table: "thread",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "club_id",
                schema: "BookClub",
                table: "thread",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<int>(
                name: "book_id",
                schema: "BookClub",
                table: "thread",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AddForeignKey(
                name: "thread_ibfk_1",
                schema: "BookClub",
                table: "thread",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id");

            migrationBuilder.AddForeignKey(
                name: "thread_ibfk_2",
                schema: "BookClub",
                table: "thread",
                columns: new[] { "book_id", "club_id" },
                principalSchema: "BookClub",
                principalTable: "reading",
                principalColumns: new[] { "book_id", "club_id" });
        }
    }
}
