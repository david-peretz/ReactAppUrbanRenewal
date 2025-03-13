using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;
using System.ComponentModel.DataAnnotations.Schema;

namespace ReactAppUrbanRenewal.Server.Models
{
    public class Document
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        public string FilePath { get; set; } = string.Empty;

        [Required]
        public string FileType { get; set; } = string.Empty;

        public long FileSize { get; set; }

        [Required]
        public string DocumentType { get; set; } = string.Empty; // Contract, Permit, License, etc.

        public DateTime UploadDate { get; set; } = DateTime.UtcNow;
        public DateTime? ExpiryDate { get; set; }

        // Foreign keys
        public int ProjectId { get; set; }

        [JsonIgnore]
        public virtual Project? Project { get; set; }

        public int? UploadedById { get; set; }

        [NotMapped]
        public string FileUrl { get; set; } = string.Empty;
    }
}
