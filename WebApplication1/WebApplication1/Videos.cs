using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1
{
    public class Videos
    {
        [Key]
        public int VideoId{get; set;}
        [ForeignKey("PlatformUser")]
        public int ProfileId{get; set;}
        public string Title { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public string UploadDate { get; set; } = string.Empty;
        public int LikesCount{get; set;}
        public int CommentsCount{get; set;}
    }
}