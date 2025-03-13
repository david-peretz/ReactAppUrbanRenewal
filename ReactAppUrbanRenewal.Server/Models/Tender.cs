using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ReactAppUrbanRenewal.Server.Models
{
    public class Tender
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Title { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        public DateTime ReleaseDate { get; set; }

        [Required]
        public DateTime SubmissionDeadline { get; set; }

        public decimal EstimatedValue { get; set; }
        public string Status { get; set; } = "Draft"; // Draft, Published, Closed, Awarded, Cancelled

        [StringLength(100)]
        public string? AwardedTo { get; set; }

        public decimal? AwardedAmount { get; set; }
        public DateTime? AwardedDate { get; set; }

        [StringLength(500)]
        public string? RequiredQualifications { get; set; }

        [StringLength(500)]
        public string? EvaluationCriteria { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign keys
        public int ProjectId { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; } = null!;

        public int? CreatedById { get; set; }
    }
}
