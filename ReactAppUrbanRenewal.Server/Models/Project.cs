using System.ComponentModel.DataAnnotations;

namespace ReactAppUrbanRenewal.Server.Models
{
    public class Project
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; } = string.Empty;

        [StringLength(500)]
        public string? Description { get; set; }

        [Required]
        [StringLength(200)]
        public string Location { get; set; } = string.Empty;

        public DateTime StartDate { get; set; }
        public DateTime? EndDate { get; set; }
        public decimal Budget { get; set; }
        public string Status { get; set; } = "Planning"; // Planning, InProgress, Completed, OnHold

        // Address Details
        public string City { get; set; } = string.Empty;
        public string Street { get; set; } = string.Empty;
        public string BuildingNumber { get; set; } = string.Empty;

        // Project Metrics
        public int TotalUnits { get; set; }
        public int CurrentOccupancy { get; set; }
        public decimal LandArea { get; set; } // in square meters
        public decimal BuildingArea { get; set; } // in square meters

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Document> Documents { get; set; } = new List<Document>();
        public virtual ICollection<Tender> Tenders { get; set; } = new List<Tender>();
        public virtual ICollection<PropertyValuation> PropertyValuations { get; set; } = new List<PropertyValuation>();
    }
}
