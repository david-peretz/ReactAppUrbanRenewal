using System.ComponentModel.DataAnnotations;

namespace ReactAppUrbanRenewal.Server.Models
{
    public class AwardTenderModel
    {
        [Required]
        public string AwardedTo { get; set; } = string.Empty;

        [Range(0, double.MaxValue)]
        public decimal? AwardedAmount { get; set; }
    }
}
