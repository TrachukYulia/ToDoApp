using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ToDoApp.Infrastructure.Migrations
{
    /// <inheritdoc />
    public partial class ToDoApp : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<DateTime>(
                name: "DueDate",
                table: "ToDoItems",
                type: "datetime2",
                maxLength: 999,
                nullable: false,
                defaultValue: new DateTime(2024, 7, 27, 0, 0, 0, 0, DateTimeKind.Local),
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldMaxLength: 999);

            migrationBuilder.AddColumn<string>(
                name: "Icon",
                table: "Category",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "list");

            migrationBuilder.AddColumn<int>(
                name: "Priority",
                table: "Category",
                type: "int",
                nullable: false,
                defaultValue: 3);

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 1,
                columns: new[] { "Icon", "Priority" },
                values: new object[] { "wb_sunny", 1 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 2,
                columns: new[] { "Icon", "Priority" },
                values: new object[] { "star", 1 });

            migrationBuilder.UpdateData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 3,
                columns: new[] { "Icon", "Priority" },
                values: new object[] { "task", 1 });

            migrationBuilder.InsertData(
                table: "Category",
                columns: new[] { "Id", "Icon", "Name", "Priority" },
                values: new object[,]
                {
                    { 4, "event", "Planned", 2 },
                    { 5, "shopping_cart", "Groceries", 2 }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Category",
                keyColumn: "Id",
                keyValue: 5);

            migrationBuilder.DropColumn(
                name: "Icon",
                table: "Category");

            migrationBuilder.DropColumn(
                name: "Priority",
                table: "Category");

            migrationBuilder.AlterColumn<DateTime>(
                name: "DueDate",
                table: "ToDoItems",
                type: "datetime2",
                maxLength: 999,
                nullable: false,
                oldClrType: typeof(DateTime),
                oldType: "datetime2",
                oldMaxLength: 999,
                oldDefaultValue: new DateTime(2024, 7, 27, 0, 0, 0, 0, DateTimeKind.Local));
        }
    }
}
