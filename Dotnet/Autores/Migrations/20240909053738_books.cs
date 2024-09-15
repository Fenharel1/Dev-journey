using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace Autores.Migrations
{
    /// <inheritdoc />
    public partial class books : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropPrimaryKey(
                name: "PK_Autores",
                table: "Autores");

            migrationBuilder.RenameTable(
                name: "Autores",
                newName: "Autor");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Autor",
                table: "Autor",
                column: "Id");

            migrationBuilder.CreateTable(
                name: "Book",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    Title = table.Column<string>(type: "nvarchar(max)", nullable: true),
                    AutorId = table.Column<int>(type: "int", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Book", x => x.Id);
                    table.ForeignKey(
                        name: "FK_Book_Autor_AutorId",
                        column: x => x.AutorId,
                        principalTable: "Autor",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.CreateIndex(
                name: "IX_Book_AutorId",
                table: "Book",
                column: "AutorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Book");

            migrationBuilder.DropPrimaryKey(
                name: "PK_Autor",
                table: "Autor");

            migrationBuilder.RenameTable(
                name: "Autor",
                newName: "Autores");

            migrationBuilder.AddPrimaryKey(
                name: "PK_Autores",
                table: "Autores",
                column: "Id");
        }
    }
}
