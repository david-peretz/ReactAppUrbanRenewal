using Microsoft.EntityFrameworkCore;
using ReactAppUrbanRenewal.Server.Data;
using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public class ProjectService : IProjectService
    {
        private readonly ApplicationDbContext _context;

        public ProjectService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Project?> GetProjectByIdAsync(int id)
        {
            return await _context.Projects
                .Include(p => p.Documents)
                .Include(p => p.Tenders)
                .Include(p => p.PropertyValuations)
                .FirstOrDefaultAsync(p => p.Id == id);
        }

        public async Task<List<Project>> GetAllProjectsAsync()
        {
            return await _context.Projects
                .AsNoTracking()
                .ToListAsync();
        }

        public async Task<List<Project>> GetProjectsByLocationAsync(string location)
        {
            return await _context.Projects
                .Where(p => p.Location.Contains(location) || p.City.Contains(location))
                .ToListAsync();
        }

        public async Task<List<Project>> GetProjectsByStatusAsync(string status)
        {
            return await _context.Projects
                .Where(p => p.Status == status)
                .ToListAsync();
        }

        public async Task<Project> CreateProjectAsync(Project project)
        {
            project.CreatedAt = DateTime.UtcNow;

            _context.Projects.Add(project);
            await _context.SaveChangesAsync();

            return project;
        }

        public async Task UpdateProjectAsync(Project project)
        {
            project.UpdatedAt = DateTime.UtcNow;

            _context.Entry(project).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteProjectAsync(int id)
        {
            var project = await _context.Projects.FindAsync(id);
            if (project == null)
            {
                return false;
            }

            _context.Projects.Remove(project);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Document>> GetProjectDocumentsAsync(int projectId)
        {
            return await _context.Documents
                .Where(d => d.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<List<Tender>> GetProjectTendersAsync(int projectId)
        {
            return await _context.Tenders
                .Where(t => t.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<List<PropertyValuation>> GetProjectValuationsAsync(int projectId)
        {
            return await _context.PropertyValuations
                .Where(pv => pv.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<List<Report>> GetProjectReportsAsync(int projectId)
        {
            return await _context.Reports
                .Where(r => r.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<decimal> GetProjectTotalValueAsync(int projectId)
        {
            var valuations = await _context.PropertyValuations
                .Where(pv => pv.ProjectId == projectId)
                .ToListAsync();

            if (valuations.Count == 0)
            {
                return 0;
            }

            return valuations.Sum(v => v.PostRenewalEstimatedValue);
        }
    }
}
