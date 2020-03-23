using Microsoft.EntityFrameworkCore.Migrations;

namespace Retrospector.Data.Migrations
{
    public partial class RetroGameUserRemoved : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_AspNetUsers_RetroGames_RetroGameId",
                table: "AspNetUsers");

            migrationBuilder.DropTable(
                name: "RetroGameUsers");

            migrationBuilder.DropIndex(
                name: "IX_AspNetUsers_RetroGameId",
                table: "AspNetUsers");

            migrationBuilder.DropColumn(
                name: "RetroGameId",
                table: "AspNetUsers");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "RetroGameId",
                table: "AspNetUsers",
                type: "int",
                nullable: true);

            migrationBuilder.CreateTable(
                name: "RetroGameUsers",
                columns: table => new
                {
                    RetroGameId = table.Column<int>(type: "int", nullable: false),
                    UserId = table.Column<string>(type: "nvarchar(450)", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RetroGameUsers", x => new { x.RetroGameId, x.UserId });
                    table.ForeignKey(
                        name: "FK_RetroGameUsers_RetroGames_RetroGameId",
                        column: x => x.RetroGameId,
                        principalTable: "RetroGames",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_RetroGameUsers_AspNetUsers_UserId",
                        column: x => x.UserId,
                        principalTable: "AspNetUsers",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_AspNetUsers_RetroGameId",
                table: "AspNetUsers",
                column: "RetroGameId");

            migrationBuilder.CreateIndex(
                name: "IX_RetroGameUsers_UserId",
                table: "RetroGameUsers",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_AspNetUsers_RetroGames_RetroGameId",
                table: "AspNetUsers",
                column: "RetroGameId",
                principalTable: "RetroGames",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
