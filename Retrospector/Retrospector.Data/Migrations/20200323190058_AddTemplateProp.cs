using Microsoft.EntityFrameworkCore.Migrations;

namespace Retrospector.Data.Migrations
{
    public partial class AddTemplateProp : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Template",
                table: "RetroGames",
                nullable: true);
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Template",
                table: "RetroGames");
        }
    }
}
