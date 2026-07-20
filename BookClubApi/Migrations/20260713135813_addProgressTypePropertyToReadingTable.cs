using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class addProgressTypePropertyToReadingTable : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Metric",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.AddColumn<int>(
                name: "progresstype_id",
                schema: "BookClub",
                table: "reading",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_reading_progresstype_id",
                schema: "BookClub",
                table: "reading",
                column: "progresstype_id");

            migrationBuilder.AddForeignKey(
                name: "reading_ibfk_3",
                schema: "BookClub",
                table: "reading",
                column: "progresstype_id",
                principalSchema: "BookClub",
                principalTable: "progressType",
                principalColumn: "progresstype_id",
                onDelete: ReferentialAction.NoAction);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "reading_ibfk_3",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.DropIndex(
                name: "IX_reading_progresstype_id",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.DropColumn(
                name: "progresstype_id",
                schema: "BookClub",
                table: "reading");

            migrationBuilder.AddColumn<string>(
                name: "Metric",
                schema: "BookClub",
                table: "reading",
                type: "longtext",
                nullable: false)
                .Annotation("MySql:CharSet", "utf8mb4");
        }
    }
}
