using System.ComponentModel.DataAnnotations;

namespace ReactAppUrbanRenewal.Server.Models
{
    public class Customer
    {
        public int Id { get; set; }

        [Required]
        [StringLength(50)]
        public string FirstName { get; set; } = string.Empty;

        [Required]
        [StringLength(50)]
        public string LastName { get; set; } = string.Empty;

        [EmailAddress]
        [StringLength(100)]
        public string? Email { get; set; }

        [StringLength(20)]
        public string? PhoneNumber { get; set; }

        [StringLength(200)]
        public string? Address { get; set; }

        public string? City { get; set; }
        public string? PostalCode { get; set; }

        [StringLength(20)]
        public string? IdentificationNumber { get; set; } // National ID, passport, etc.

        [StringLength(50)]
        public string CustomerType { get; set; } = "Resident"; // Resident, Business, Government, etc.

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigation properties
        public virtual ICollection<Project> Projects { get; set; } = new List<Project>();
    }
}
