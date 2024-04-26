using Microsoft.EntityFrameworkCore;
namespace WebApplication1.Data
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options) { }

        public DbSet<PlatformUser> PlatformUsers => Set<PlatformUser>();
        public DbSet<Posts> Posts => Set<Posts>();
        public DbSet<Videos> Videos => Set<Videos>();




        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            // Seed PlatformUser
            modelBuilder.Entity<PlatformUser>().HasData(
                new PlatformUser { ProfileId = 1, PlatformUsername = "User1", Platform = "Twitter", Description = "Description1", FollowerCount = 100, FollowingCount = 50, CreationDate = "2022-01-01" },
                new PlatformUser { ProfileId = 2, PlatformUsername = "User2", Platform = "Facebook", Description = "Description2", FollowerCount = 200, FollowingCount = 100, CreationDate = "2022-02-01" },
                new PlatformUser { ProfileId = 3, PlatformUsername = "User3", Platform = "Instagram", Description = "Description3", FollowerCount = 300, FollowingCount = 150, CreationDate = "2022-03-01" },
                new PlatformUser { ProfileId = 4, PlatformUsername = "User4", Platform = "YouTube", Description = "Description4", FollowerCount = 400, FollowingCount = 200, CreationDate = "2022-04-01" },
                new PlatformUser { ProfileId = 5, PlatformUsername = "User5", Platform = "LinkedIn", Description = "Description5", FollowerCount = 500, FollowingCount = 250, CreationDate = "2022-05-01" }
            );

            // Seed Posts for each user
            modelBuilder.Entity<Posts>().HasData(
                new Posts { PostId = 1, ProfileId = 1, Caption = "First Post", Date = "2022-01-02", LikesCount = 10, CommentsCount = 5 },
                new Posts { PostId = 2, ProfileId = 1, Caption = "Second Post", Date = "2022-01-03", LikesCount = 12, CommentsCount = 6 },
                new Posts { PostId = 3, ProfileId = 2, Caption = "Hello World", Date = "2022-02-02", LikesCount = 15, CommentsCount = 8 },
                new Posts { PostId = 4, ProfileId = 3, Caption = "Another Post", Date = "2022-03-03", LikesCount = 5, CommentsCount = 2 },
                new Posts { PostId = 5, ProfileId = 2, Caption = "Second Post User 2", Date = "2022-02-05", LikesCount = 8, CommentsCount = 4 },
                new Posts { PostId = 6, ProfileId = 3, Caption = "Post Three User 3", Date = "2022-03-06", LikesCount = 9, CommentsCount = 7 },
                new Posts { PostId = 7, ProfileId = 4, Caption = "YouTube First Post", Date = "2022-04-07", LikesCount = 30, CommentsCount = 12 },
                new Posts { PostId = 8, ProfileId = 5, Caption = "LinkedIn Intro", Date = "2022-05-08", LikesCount = 20, CommentsCount = 10 }
            );

            // Seed Videos for each user
            modelBuilder.Entity<Videos>().HasData(
                new Videos { VideoId = 1, ProfileId = 4, Title = "Introduction Video", Description = "Welcome to my channel", UploadDate = "2022-04-02", LikesCount = 20, CommentsCount = 10 },
                new Videos { VideoId = 2, ProfileId = 5, Title = "Tutorial Video", Description = "Learn something new", UploadDate = "2022-05-02", LikesCount = 30, CommentsCount = 12 },
                new Videos { VideoId = 3, ProfileId = 3, Title = "InstaVid 1", Description = "First Insta Video", UploadDate = "2022-03-05", LikesCount = 25, CommentsCount = 11 },
                new Videos { VideoId = 4, ProfileId = 1, Title = "TwitterVid 1", Description = "What's happening", UploadDate = "2022-01-07", LikesCount = 5, CommentsCount = 3 },
                new Videos { VideoId = 5, ProfileId = 2, Title = "Facebook Live", Description = "Live session on Facebook", UploadDate = "2022-02-07", LikesCount = 18, CommentsCount = 9 }
            );
        }

    }
}