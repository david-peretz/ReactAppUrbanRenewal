using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public interface IReportService
    {
        Task<Report?> GetReportByIdAsync(int id);
        Task<List<Report>> GetAllReportsAsync();
        Task<List<Report>> GetReportsByProjectIdAsync(int projectId);
        Task<List<Report>> GetReportsByTypeAsync(string reportType);
        Task<List<Report>> GetReportsByDateRangeAsync(DateTime startDate, DateTime endDate);
        Task<Report> CreateReportAsync(Report report, IFormFile? file = null);
        Task UpdateReportAsync(Report report);
        Task<bool> DeleteReportAsync(int id);
        Task<byte[]?> DownloadReportFileAsync(int id);
        Task<List<Report>> GetRecentReportsAsync(int count);
        Task<Dictionary<string, int>> GetReportCountByTypeAsync();
    }
}
