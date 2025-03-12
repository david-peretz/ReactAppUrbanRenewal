using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public interface IDocumentService
    {
        Task<Document?> GetDocumentByIdAsync(int id);
        Task<List<Document>> GetAllDocumentsAsync();
        Task<List<Document>> GetDocumentsByProjectIdAsync(int projectId);
        Task<List<Document>> GetDocumentsByTypeAsync(string documentType);
        Task<Document> CreateDocumentAsync(Document document, IFormFile file);
        Task UpdateDocumentAsync(Document document);
        Task<bool> DeleteDocumentAsync(int id);
        Task<byte[]> DownloadDocumentAsync(int id);
        Task<string> GetDocumentUrlAsync(int id);
        Task<List<Document>> SearchDocumentsAsync(string searchTerm);
    }
}
