using Microsoft.EntityFrameworkCore.Migrations;

namespace Retrospector.Data.Migrations
{
    public partial class OnDeleteSelectedTeamDeleted : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserSelectedTeams_AspNetUsers_UserId",
                table: "UserSelectedTeams");

            migrationBuilder.CreateIndex(
                name: "IX_UserSelectedTeams_TeamId",
                table: "UserSelectedTeams",
                column: "TeamId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserSelectedTeams_Teams_TeamId",
                table: "UserSelectedTeams",
                column: "TeamId",
                principalTable: "Teams",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserSelectedTeams_AspNetUsers_UserId",
                table: "UserSelectedTeams",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserSelectedTeams_Teams_TeamId",
                table: "UserSelectedTeams");

            migrationBuilder.DropForeignKey(
                name: "FK_UserSelectedTeams_AspNetUsers_UserId",
                table: "UserSelectedTeams");

            migrationBuilder.DropIndex(
                name: "IX_UserSelectedTeams_TeamId",
                table: "UserSelectedTeams");

            migrationBuilder.AddForeignKey(
                name: "FK_UserSelectedTeams_AspNetUsers_UserId",
                table: "UserSelectedTeams",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
