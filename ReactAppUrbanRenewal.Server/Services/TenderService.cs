using Microsoft.EntityFrameworkCore;
using ReactAppUrbanRenewal.Server.Data;
using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public class TenderService : ITenderService
    {
        private readonly ApplicationDbContext _context;

        public TenderService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Tender?> GetTenderByIdAsync(int id)
        {
            return await _context.Tenders
                .Include(t => t.Project)
                .FirstOrDefaultAsync(t => t.Id == id);
        }

        public async Task<List<Tender>> GetAllTendersAsync()
        {
            return await _context.Tenders
                .Include(t => t.Project)
                .ToListAsync();
        }

        public async Task<List<Tender>> GetTendersByProjectIdAsync(int projectId)
        {
            return await _context.Tenders
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<List<Tender>> GetTendersByStatusAsync(string status)
        {
            return await _context.Tenders
                .Where(t => t.Status == status)
                .ToListAsync();
        }

        public async Task<List<Tender>> GetOpenTendersAsync()
        {
            return await _context.Tenders
                .Where(t => t.Status == "Published" && t.SubmissionDeadline > DateTime.UtcNow)
                .Include(t => t.Project)
                .OrderBy(t => t.SubmissionDeadline)
                .ToListAsync();
        }

        public async Task<Tender> CreateTenderAsync(Tender tender)
        {
            tender.CreatedAt = DateTime.UtcNow;

            _context.Tenders.Add(tender);
            await _context.SaveChangesAsync();

            return tender;
        }

        public async Task UpdateTenderAsync(Tender tender)
        {
            tender.UpdatedAt = DateTime.UtcNow;

            _context.Entry(tender).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteTenderAsync(int id)
        {
            var tender = await _context.Tenders.FindAsync(id);
            if (tender == null)
            {
                return false;
            }

            _context.Tenders.Remove(tender);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<bool> AwardTenderAsync(int tenderId, string awardedTo, decimal? awardedAmount)
        {
            var tender = await _context.Tenders.FindAsync(tenderId);
            if (tender == null)
            {
                return false;
            }

            tender.Status = "Awarded";
            tender.AwardedTo = awardedTo;
            tender.AwardedAmount = awardedAmount;
            tender.AwardedDate = DateTime.UtcNow;
            tender.UpdatedAt = DateTime.UtcNow;

            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Tender>> GetTendersClosingSoonAsync(int daysToDeadline)
        {
            var cutoffDate = DateTime.UtcNow.AddDays(daysToDeadline);

            return await _context.Tenders
                .Where(t => t.Status == "Published" &&
                       t.SubmissionDeadline <= cutoffDate &&
                       t.SubmissionDeadline > DateTime.UtcNow)
                .Include(t => t.Project)
                .OrderBy(t => t.SubmissionDeadline)
                .ToListAsync();
        }
    }
}
