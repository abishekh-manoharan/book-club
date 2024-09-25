using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class UpdateNullabilityOfClubrecommendationsProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "clubrecommendations_ibfk_2",
                schema: "BookClub",
                table: "clubrecommendations");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                schema: "BookClub",
                table: "clubrecommendations",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_added",
                schema: "BookClub",
                table: "clubrecommendations",
                type: "datetime",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified),
                oldClrType: typeof(DateTime),
                oldType: "datetime",
                oldNullable: true);

            migrationBuilder.AddForeignKey(
                name: "clubrecommendations_ibfk_2",
                schema: "BookClub",
                table: "clubrecommendations",
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
                name: "clubrecommendations_ibfk_2",
                schema: "BookClub",
                table: "clubrecommendations");

            migrationBuilder.AlterColumn<int>(
                name: "user_id",
                schema: "BookClub",
                table: "clubrecommendations",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<DateTime>(
                name: "date_added",
                schema: "BookClub",
                table: "clubrecommendations",
                type: "datetime",
                nullable: true,
                oldClrType: typeof(DateTime),
                oldType: "datetime");

            migrationBuilder.AddForeignKey(
                name: "clubrecommendations_ibfk_2",
                schema: "BookClub",
                table: "clubrecommendations",
                column: "user_id",
                principalSchema: "BookClub",
                principalTable: "user",
                principalColumn: "user_id");
        }
    }
}
