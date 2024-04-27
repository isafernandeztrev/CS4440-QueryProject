using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication1
{
    public class PlatformUpdate
    {
        [Key]
        public int NewUpdateID{get; set;}
        [ForeignKey("PlatformUser")]
        public string ProfileId{get; set; } = string.Empty;
        public int FollowerCount{get; set;}
        public string CreationDate { get; set; } = string.Empty;
    }
}