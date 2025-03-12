using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using ReactAppUrbanRenewal.Server.Data;
using ReactAppUrbanRenewal.Server.Models;
using System.IO;

namespace ReactAppUrbanRenewal.Server.Services
{
    public class DocumentService : IDocumentService
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _configuration;

        public DocumentService(ApplicationDbContext context, IConfiguration configuration)
        {
            _context = context;
            _configuration = configuration;
        }

        public async Task<Document?> GetDocumentByIdAsync(int id)
        {
            return await _context.Documents.FindAsync(id);
        }

        public async Task<List<Document>> GetAllDocumentsAsync()
        {
            return await _context.Documents.ToListAsync();
        }

        public async Task<List<Document>> GetDocumentsByProjectIdAsync(int projectId)
        {
            return await _context.Documents
                .Where(d => d.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<List<Document>> GetDocumentsByTypeAsync(string documentType)
        {
            return await _context.Documents
                .Where(d => d.DocumentType == documentType)
                .ToListAsync();
        }

        public async Task<Document> CreateDocumentAsync(Document document, IFormFile file)
        {
            // Ensure documents directory exists
            var documentsPath = _configuration["Storage:DocumentsPath"];
            if (!Directory.Exists(documentsPath))
            {
                Directory.CreateDirectory(documentsPath);
            }

            // Create a unique filename
            var fileExtension = Path.GetExtension(file.FileName);
            var uniqueFileName = $"{Guid.NewGuid()}{fileExtension}";
            var filePath = Path.Combine(documentsPath, uniqueFileName);

            // Save file to disk
            using (var stream = new FileStream(filePath, FileMode.Create))
            {
                await file.CopyToAsync(stream);
            }

            // Update document properties
            document.FilePath = filePath;
            document.FileType = file.ContentType;
            document.FileSize = file.Length;
            document.UploadDate = DateTime.UtcNow;

            // Save to database
            _context.Documents.Add(document);
            await _context.SaveChangesAsync();

            return document;
        }

        public async Task UpdateDocumentAsync(Document document)
        {
            _context.Entry(document).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteDocumentAsync(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null)
            {
                return false;
            }

            // Delete file from disk if it exists
            if (File.Exists(document.FilePath))
            {
                File.Delete(document.FilePath);
            }

            // Remove from database
            _context.Documents.Remove(document);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<byte[]> DownloadDocumentAsync(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null || !File.Exists(document.FilePath))
            {
                return new byte[0];
            }

            return await File.ReadAllBytesAsync(document.FilePath);
        }

        public async Task<string> GetDocumentUrlAsync(int id)
        {
            var document = await _context.Documents.FindAsync(id);
            if (document == null)
            {
                return string.Empty;
            }

            // In a real application, this could return a URL to a file server or CDN
            // For now, we'll just return a local API endpoint
            return $"/api/documents/{id}/download";
        }

        public async Task<List<Document>> SearchDocumentsAsync(string searchTerm)
        {
            return await _context.Documents
                .Where(d => d.Name.Contains(searchTerm) ||
                            (d.Description != null && d.Description.Contains(searchTerm)))
                .ToListAsync();
        }
    }
}
