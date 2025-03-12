using System.ComponentModel.DataAnnotations;

namespace ReactAppUrbanRenewal.Server.Models
{
    public class Report
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        public string ReportType { get; set; } = "Progress"; // Progress, Financial, Environmental, Social Impact

        public string? FilePath { get; set; }
        public string? FileType { get; set; }
        public long? FileSize { get; set; }

        [Required]
        public DateTime ReportDate { get; set; }

        public string Status { get; set; } = "Draft"; // Draft, Published, Archived

        [StringLength(1000)]
        public string? Content { get; set; }

        [StringLength(100)]
        public string? Author { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign keys
        public int? ProjectId { get; set; }
        public virtual Project? Project { get; set; }

        public int? CreatedById { get; set; }
    }
}
