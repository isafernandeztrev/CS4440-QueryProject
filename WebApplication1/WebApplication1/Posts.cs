using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1
{
    public class Posts
    {
        [Key]
        public int PostId{get; set;}
        [ForeignKey("PlatformUser")]
        public int ProfileId{get; set;}
        public string Caption { get; set; } = string.Empty;
        public string Date { get; set; } = string.Empty;
        public int LikesCount{get; set;}
        public int CommentsCount{get; set;}
    }
}
