using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public interface IProjectService
    {
        Task<Project?> GetProjectByIdAsync(int id);
        Task<List<Project>> GetAllProjectsAsync();
        Task<List<Project>> GetProjectsByLocationAsync(string location);
        Task<List<Project>> GetProjectsByStatusAsync(string status);
        Task<Project> CreateProjectAsync(Project project);
        Task UpdateProjectAsync(Project project);
        Task<bool> DeleteProjectAsync(int id);
        Task<List<Document>> GetProjectDocumentsAsync(int projectId);
        Task<List<Tender>> GetProjectTendersAsync(int projectId);
        Task<List<PropertyValuation>> GetProjectValuationsAsync(int projectId);
        Task<List<Report>> GetProjectReportsAsync(int projectId);
        Task<decimal> GetProjectTotalValueAsync(int projectId);
    }
}
