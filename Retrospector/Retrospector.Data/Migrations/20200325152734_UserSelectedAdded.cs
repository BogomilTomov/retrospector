using Microsoft.EntityFrameworkCore.Migrations;

namespace Retrospector.Data.Migrations
{
    public partial class UserSelectedAdded : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "UserSelectedTeams",
                columns: table => new
                {
                    Id = table.Column<int>(nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    UserId = table.Column<string>(nullable: false),
                    TeamId = table.Column<int>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserSelectedTeams", x => x.Id);
                    table.ForeignKey(
                        name: "FK_UserSelectedTeams_Teams_TeamId",
                        column: x => x.TeamId,
                        principalTable: "Teams",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_UserSelectedTeams_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_UserSelectedTeams_TeamId",
                table: "UserSelectedTeams",
                column: "TeamId");

            migrationBuilder.CreateIndex(
                name: "IX_UserSelectedTeams_UserId",
                table: "UserSelectedTeams",
                column: "UserId",
                unique: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "UserSelectedTeams");
        }
    }
}
