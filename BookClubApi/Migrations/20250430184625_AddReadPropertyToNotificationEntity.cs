﻿using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace BookClubApi.Migrations
{
    /// <inheritdoc />
    public partial class AddReadPropertyToNotificationEntity : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "Read",
                schema: "BookClub",
                table: "notification",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Read",
                schema: "BookClub",
                table: "notification");
        }
    }
}
