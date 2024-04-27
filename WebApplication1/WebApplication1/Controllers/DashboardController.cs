using Microsoft.AspNetCore.Mvc;
using WebApplication1.Data;
using Microsoft.EntityFrameworkCore;
using System.Globalization;
namespace WebApplication1.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class DashboardController : ControllerBase
    {
        private readonly DataContext _context;
        public DashboardController(DataContext context)
        {
            _context = context;
        }

        [HttpGet("GetFirstDashboard")]
        public async Task<IActionResult> GetFirstDashboard(string description)
        {
            var platforms = new string[] { "TikTok", "YouTube", "Instagram" };
            var results = new int[3, 2];

            for (int i = 0; i < platforms.Length; i++)
            {
                string platform = platforms[i];

                var totalLikes = await _context.PlatformUsers
                    .Where(pu => pu.Platform == platform && pu.Description == description)
                    .Join(_context.Posts, pu => pu.ProfileId, post => post.ProfileId,
                          (pu, post) => post.LikesCount)
                    .Concat(_context.PlatformUsers
                        .Where(pu => pu.Platform == platform && pu.Description == description)
                        .Join(_context.Videos, pu => pu.ProfileId, video => video.ProfileId,
                              (pu, video) => video.LikesCount))
                    .SumAsync();

                var totalComments = await _context.PlatformUsers
                    .Where(pu => pu.Platform == platform && pu.Description == description)
                    .Join(_context.Posts, pu => pu.ProfileId, post => post.ProfileId,
                          (pu, post) => post.CommentsCount)
                    .Concat(_context.PlatformUsers
                        .Where(pu => pu.Platform == platform && pu.Description == description)
                        .Join(_context.Videos, pu => pu.ProfileId, video => video.ProfileId,
                              (pu, video) => video.CommentsCount))
                    .SumAsync();

                results[i, 0] = totalLikes;
                results[i, 1] = totalComments;
            }

            return Ok(new int[][] {
                new int[] { results[0, 0], results[0, 1] },
                new int[] { results[1, 0], results[1, 1] },
                new int[] { results[2, 0], results[2, 1] }
            });
        }

        [HttpGet("getTotalNumberOfLikesAndComments")]
        public async Task<IActionResult> GetTotalNumberOfLikesAndComments(int queryID, string contentType)
        {
            if (contentType != "Posts" && contentType != "Videos")
                return BadRequest("Invalid content type specified. Please choose 'Posts' or 'Videos'.");

            int total = 0;

            if (contentType == "Posts")
            {
                total = queryID == 0 ?
                    await _context.Posts.SumAsync(p => p.LikesCount) :
                    await _context.Posts.SumAsync(p => p.CommentsCount);
            }
            else if (contentType == "Videos")
            {
                total = queryID == 0 ?
                    await _context.Videos.SumAsync(v => v.LikesCount) :
                    await _context.Videos.SumAsync(v => v.CommentsCount);
            }

            return Ok(total);
        }


        [HttpGet("getTotalNumOfFollowers")]
        public async Task<IActionResult> GetTotalNumOfFollowers()
        {
            var platforms = new string[] { "TikTok", "YouTube", "Facebook" };
            var results = new int[3, 5];
            var now = DateTime.UtcNow;

            for (int i = 0; i < platforms.Length; i++)
            {
                for (int j = 0; j < 5; j++)
                {
                    var dateThreshold = now.AddMonths(-j - 1);

                    var totalFollowers = await _context.PlatformUsers
                        .Where(pu => pu.Platform == platforms[i])
                        .ToListAsync();

                    var filteredFollowers = totalFollowers
                        .Where(pu => DateTime.ParseExact(pu.CreationDate, "yyyy-MM-dd", CultureInfo.InvariantCulture) <= dateThreshold)
                        .Sum(pu => pu.FollowerCount);

                    results[i, j] = filteredFollowers;
                }
            }

            return Ok(new int[][] {
                new int[] { results[0, 4], results[0, 3], results[0, 2], results[0, 1], results[0, 0] },
                new int[] { results[1, 4], results[1, 3], results[1, 2], results[1, 1], results[1, 0] },
                new int[] { results[2, 4], results[2, 3], results[2, 2], results[2, 1], results[2, 0] }
            });
        }

        [HttpPut("update")]
        public async Task<IActionResult> UpdatePlatformUser([FromBody] PlatformUserUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

           var user = await _context.PlatformUsers
            .Where(pu => pu.Description == updateDto.Description && pu.Platform == updateDto.Platform)
            .FirstOrDefaultAsync();

            if (user == null) {
                user = new PlatformUser();
            }

       
            user.PlatformUsername = updateDto.PlatformUsername;
            user.Platform = updateDto.Platform;
            user.Description = updateDto.Description;
            user.FollowerCount = updateDto.FollowerCount;
            user.FollowingCount = updateDto.FollowingCount;
            user.CreationDate = updateDto.CreationDate;

            
            try
            {
                _context.PlatformUsers.Update(user);
                await _context.SaveChangesAsync();
                return Ok(user);
            }
            catch (DbUpdateException)
            {
                
                return StatusCode(500);
            }
        }

        public class PlatformUserUpdateDto
        {
            public string PlatformUsername { get; set; } = string.Empty;
            public string Platform { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public int FollowerCount { get; set; }
            public int FollowingCount{get; set;}
            public string CreationDate { get; set; } = string.Empty;
        }

        [HttpPut("updatePosts")]
        public async Task<IActionResult> UpdatePosts([FromBody] PostsUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var profile = await _context.PlatformUsers
                .FirstOrDefaultAsync(pu => pu.Description == updateDto.Email && pu.Platform == updateDto.Platform);

            var post = await _context.Posts 
                .FirstOrDefaultAsync(p => p.ProfileId == profile.ProfileId && p.Caption == updateDto.Caption);

            if (post == null)
            {
                post = new Posts
                {
                    ProfileId = profile.ProfileId,
                    Caption = updateDto.Caption,
                    Date = updateDto.Date,
                    LikesCount = updateDto.LikesCount,
                    CommentsCount = updateDto.CommentsCount
                };
                _context.Posts.Add(post);
            }
            else
            {
        
                post.LikesCount = updateDto.LikesCount;
                post.CommentsCount = updateDto.CommentsCount;
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(post); 
            }
            catch (DbUpdateException ex)
            {
        
                return StatusCode(500, $"An error occurred while updating the post: {ex.Message}");
            }
        }

        public class PostsUpdateDto
        {   
            public string Email { get; set; } = string.Empty;
            public string Platform { get; set; } = string.Empty;
            public string Caption { get; set; } = string.Empty;
            public string Date { get; set; } = string.Empty;
            public int LikesCount { get; set; }
            public int CommentsCount { get; set; }
        }




        [HttpPut("updateVideos")]
        public async Task<IActionResult> UpdatePosts([FromBody] VideosUpdateDto updateDto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var profile = await _context.PlatformUsers
                .FirstOrDefaultAsync(pu => pu.Description == updateDto.Email && pu.Platform == updateDto.Platform);

            var video = await _context.Videos 
                .FirstOrDefaultAsync(v => v.ProfileId == profile.ProfileId && v.Title == updateDto.Title);

            if (video == null)
            {
                video = new Videos
                {
                    ProfileId = profile.ProfileId,
                    Title = updateDto.Title,
                    Description = updateDto.Description,
                    UploadDate = updateDto.UploadDate,
                    LikesCount = updateDto.LikesCount,
                    CommentsCount = updateDto.CommentsCount
                };
                _context.Videos.Add(video);
            }
            else
            {
        
                video.LikesCount = updateDto.LikesCount;
                video.CommentsCount = updateDto.CommentsCount;
            }

            try
            {
                await _context.SaveChangesAsync();
                return Ok(video); 
            }
            catch (DbUpdateException ex)
            {
        
                return StatusCode(500, $"An error occurred while updating the post: {ex.Message}");
            }
        }

        public class VideosUpdateDto
        {   
            public string Email { get; set; } = string.Empty;
            public string Platform { get; set; } = string.Empty;
            public string Title { get; set; } = string.Empty;
            public string Description { get; set; } = string.Empty;
            public string UploadDate { get; set; } = string.Empty;
            public int LikesCount{get; set;}
            public int CommentsCount{get; set;}
        }






    }
}
