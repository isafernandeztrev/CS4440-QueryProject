using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace WebApplication1.Migrations
{
    /// <inheritdoc />
    public partial class Seed : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "PlatformUsers",
                columns: new[] { "ProfileId", "CreationDate", "Description", "FollowerCount", "FollowingCount", "Platform", "PlatformUsername" },
                values: new object[,]
                {
                    { 1, "2022-01-01", "Description1", 100, 50, "Twitter", "User1" },
                    { 2, "2022-02-01", "Description2", 200, 100, "Facebook", "User2" },
                    { 3, "2022-03-01", "Description3", 300, 150, "Instagram", "User3" },
                    { 4, "2022-04-01", "Description4", 400, 200, "YouTube", "User4" },
                    { 5, "2022-05-01", "Description5", 500, 250, "LinkedIn", "User5" }
                });

            migrationBuilder.InsertData(
                table: "Posts",
                columns: new[] { "PostId", "Caption", "CommentsCount", "Date", "LikesCount", "ProfileId" },
                values: new object[,]
                {
                    { 1, "First Post", 5, "2022-01-02", 10, 1 },
                    { 2, "Second Post", 6, "2022-01-03", 12, 1 },
                    { 3, "Hello World", 8, "2022-02-02", 15, 2 },
                    { 4, "Another Post", 2, "2022-03-03", 5, 3 },
                    { 5, "Second Post User 2", 4, "2022-02-05", 8, 2 },
                    { 6, "Post Three User 3", 7, "2022-03-06", 9, 3 },
                    { 7, "YouTube First Post", 12, "2022-04-07", 30, 4 },
                    { 8, "LinkedIn Intro", 10, "2022-05-08", 20, 5 }
                });

            migrationBuilder.InsertData(
                table: "Videos",
                columns: new[] { "VideoId", "CommentsCount", "Description", "LikesCount", "ProfileId", "Title", "UploadDate" },
                values: new object[,]
                {
                    { 1, 10, "Welcome to my channel", 20, 4, "Introduction Video", "2022-04-02" },
                    { 2, 12, "Learn something new", 30, 5, "Tutorial Video", "2022-05-02" },
                    { 3, 11, "First Insta Video", 25, 3, "InstaVid 1", "2022-03-05" },
                    { 4, 3, "What's happening", 5, 1, "TwitterVid 1", "2022-01-07" },
                    { 5, 9, "Live session on Facebook", 18, 2, "Facebook Live", "2022-02-07" }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "PlatformUsers",
                keyColumn: "ProfileId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "PlatformUsers",
                keyColumn: "ProfileId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "PlatformUsers",
                keyColumn: "ProfileId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "PlatformUsers",
                keyColumn: "ProfileId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "PlatformUsers",
                keyColumn: "ProfileId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 5);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 6);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 7);

            migrationBuilder.DeleteData(
                table: "Posts",
                keyColumn: "PostId",
                keyValue: 8);

            migrationBuilder.DeleteData(
                table: "Videos",
                keyColumn: "VideoId",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Videos",
                keyColumn: "VideoId",
                keyValue: 2);

            migrationBuilder.DeleteData(
                table: "Videos",
                keyColumn: "VideoId",
                keyValue: 3);

            migrationBuilder.DeleteData(
                table: "Videos",
                keyColumn: "VideoId",
                keyValue: 4);

            migrationBuilder.DeleteData(
                table: "Videos",
                keyColumn: "VideoId",
                keyValue: 5);
        }
    }
}
