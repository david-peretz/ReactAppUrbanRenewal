using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public interface ITenderService
    {
        Task<Tender?> GetTenderByIdAsync(int id);
        Task<List<Tender>> GetAllTendersAsync();
        Task<List<Tender>> GetTendersByProjectIdAsync(int projectId);
        Task<List<Tender>> GetTendersByStatusAsync(string status);
        Task<List<Tender>> GetOpenTendersAsync();
        Task<Tender> CreateTenderAsync(Tender tender);
        Task UpdateTenderAsync(Tender tender);
        Task<bool> DeleteTenderAsync(int id);
        Task<bool> AwardTenderAsync(int tenderId, string awardedTo, decimal awardedAmount);
        Task<List<Tender>> GetTendersClosingSoonAsync(int daysToDeadline);
    }
}
