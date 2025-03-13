using System.ComponentModel.DataAnnotations;
using System.Text.Json.Serialization;

namespace ReactAppUrbanRenewal.Server.Models
{
    public class PropertyValuation
    {
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string PropertyAddress { get; set; } = string.Empty;

        public string PropertyType { get; set; } = "Residential"; // Residential, Commercial, Industrial, Mixed-Use

        public decimal AssessedValue { get; set; }
        public decimal MarketValue { get; set; }
        public decimal PostRenewalEstimatedValue { get; set; }

        public decimal PropertyArea { get; set; } // in square meters
        public int NumberOfRooms { get; set; }
        public int YearBuilt { get; set; }

        [StringLength(500)]
        public string? ValuationNotes { get; set; }

        [Required]
        public DateTime ValuationDate { get; set; }

        public string ValuationMethod { get; set; } = "Market Comparison"; // Market Comparison, Income Approach, Cost Approach

        [StringLength(100)]
        public string? ValuedBy { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Foreign keys
        public int ProjectId { get; set; }

        [JsonIgnore]
        public virtual Project Project { get; set; } = null!;
    }
}
