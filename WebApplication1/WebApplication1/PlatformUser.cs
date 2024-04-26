using System.ComponentModel.DataAnnotations;

namespace WebApplication1
{
    public class PlatformUser
    {
        [Key]
        public int ProfileId{get; set;}
        public string PlatformUsername { get; set; } = string.Empty;
        public string Platform { get; set; } = string.Empty;
        public string Description { get; set; } = string.Empty;
        public int FollowerCount{get; set;}
        public int FollowingCount{get; set;}
        public string CreationDate { get; set; } = string.Empty;
    }
}