using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateDeleteBehaviourOfUserModel : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "user_ibfk_1",
                schema: "BookClub",
                table: "user");

            migrationBuilder.AlterColumn<bool>(
                name: "open",
                schema: "BookClub",
                table: "poll",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "user_ibfk_1",
                schema: "BookClub",
                table: "user",
                column: "aspnetusers_id",
                principalSchema: "BookClub",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "user_ibfk_1",
                schema: "BookClub",
                table: "user");

            migrationBuilder.AlterColumn<bool>(
                name: "open",
                schema: "BookClub",
                table: "poll",
                type: "tinyint(1)",
                nullable: true,
                oldClrType: typeof(bool),
                oldType: "tinyint(1)");

            migrationBuilder.AddForeignKey(
                name: "user_ibfk_1",
                schema: "BookClub",
                table: "user",
                column: "aspnetusers_id",
                principalSchema: "BookClub",
                principalTable: "AspNetUsers",
                principalColumn: "Id");
        }
    }
}
