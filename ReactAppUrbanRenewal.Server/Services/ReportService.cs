using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReactAppUrbanRenewal.Server.Data;
using ReactAppUrbanRenewal.Server.Models;
using System.IO;

namespace ReactAppUrbanRenewal.Server.Services
{
    public class ReportService : IReportService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public ReportService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Report?> GetReportByIdAsync(int id)
        {
            return await _context.Reports
                .Include(r => r.Project)
                .FirstOrDefaultAsync(r => r.Id == id);
        }

        public async Task<List<Report>> GetAllReportsAsync()
        {
            return await _context.Reports
                .Include(r => r.Project)
                .ToListAsync();
        }

        public async Task<List<Report>> GetReportsByProjectIdAsync(int projectId)
        {
            return await _context.Reports
                .Where(r => r.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<List<Report>> GetReportsByTypeAsync(string reportType)
        {
            return await _context.Reports
                .Where(r => r.ReportType == reportType)
                .ToListAsync();
        }

        public async Task<List<Report>> GetReportsByDateRangeAsync(DateTime startDate, DateTime endDate)
        {
            return await _context.Reports
                .Where(r => r.ReportDate >= startDate && r.ReportDate <= endDate)
                .ToListAsync();
        }

        public async Task<Report> CreateReportAsync(Report report, IFormFile? file = null)
        {
            report.CreatedAt = DateTime.UtcNow;

            // Handle file upload if included
            if (file != null && file.Length > 0)
            {
                // Ensure reports directory exists
                var reportsPath = Path.Combine(_configuration["Storage:DocumentsPath"], "reports");
                if (!Directory.Exists(reportsPath))
                {
                    Directory.CreateDirectory(reportsPath);
                }

                // Create a unique filename
                var fileExtension = Path.GetExtension(file.FileName);
                var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
                var filePath = Path.Combine(reportsPath, uniqueFileName);

                // Save file to disk
                using (var stream = new FileStream(filePath, FileMode.Create))
                {
                    await file.CopyToAsync(stream);
                }

                // Update report properties
                report.FilePath = filePath;
                report.FileType = file.ContentType;
                report.FileSize = file.Length;
            }

            _context.Reports.Add(report);
            await _context.SaveChangesAsync();

            return report;
        }

        public async Task UpdateReportAsync(Report report)
        {
            report.UpdatedAt = DateTime.UtcNow;

            _context.Entry(report).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteReportAsync(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null)
            {
                return false;
            }

            // Delete file from disk if it exists
            if (!string.IsNullOrEmpty(report.FilePath) && File.Exists(report.FilePath))
            {
                File.Delete(report.FilePath);
            }

            _context.Reports.Remove(report);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<byte[]?> DownloadReportFileAsync(int id)
        {
            var report = await _context.Reports.FindAsync(id);
            if (report == null || string.IsNullOrEmpty(report.FilePath) || !File.Exists(report.FilePath))
            {
                return null;
            }

            return await File.ReadAllBytesAsync(report.FilePath);
        }

        public async Task<List<Report>> GetRecentReportsAsync(int count)
        {
            return await _context.Reports
                .Include(r => r.Project)
                .OrderByDescending(r => r.ReportDate)
                .Take(count)
                .ToListAsync();
        }

        public async Task<Dictionary<string, int>> GetReportCountByTypeAsync()
        {
            return await _context.Reports
                .GroupBy(r => r.ReportType)
                .Select(g => new { Type = g.Key, Count = g.Count() })
                .ToDictionaryAsync(x => x.Type, x => x.Count);
        }
    }
}
