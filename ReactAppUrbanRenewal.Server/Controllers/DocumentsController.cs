using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactAppUrbanRenewal.Server.Models;
using ReactAppUrbanRenewal.Server.Services;

namespace ReactAppUrbanRenewal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class DocumentsController : ControllerBase
    {
        private readonly IDocumentService _documentService;

        public DocumentsController(IDocumentService documentService)
        {
            _documentService = documentService;
        }

        // GET: api/documents
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocuments()
        {
            var documents = await _documentService.GetAllDocumentsAsync();
            return Ok(documents);
        }

        // GET: api/documents/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Document>> GetDocument(int id)
        {
            var document = await _documentService.GetDocumentByIdAsync(id);

            if (document == null)
            {
                return NotFound();
            }

            return Ok(document);
        }

        // GET: api/documents/project/5
        [HttpGet("project/{projectId}")]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocumentsByProject(int projectId)
        {
            var documents = await _documentService.GetDocumentsByProjectIdAsync(projectId);
            return Ok(documents);
        }

        // GET: api/documents/type/Contract
        [HttpGet("type/{documentType}")]
        public async Task<ActionResult<IEnumerable<Document>>> GetDocumentsByType(string documentType)
        {
            var documents = await _documentService.GetDocumentsByTypeAsync(documentType);
            return Ok(documents);
        }

        // GET: api/documents/search
        [HttpGet("search")]
        public async Task<ActionResult<IEnumerable<Document>>> SearchDocuments([FromQuery] string term)
        {
            if (string.IsNullOrWhiteSpace(term))
            {
                return BadRequest("Search term is required");
            }

            var documents = await _documentService.SearchDocumentsAsync(term);
            return Ok(documents);
        }

        // GET: api/documents/5/download
        [HttpGet("{id}/download")]
        public async Task<IActionResult> DownloadDocument(int id)
        {
            var document = await _documentService.GetDocumentByIdAsync(id);
            if (document == null)
            {
                return NotFound();
            }

            var fileContents = await _documentService.DownloadDocumentAsync(id);
            if (fileContents == null || fileContents.Length == 0)
            {
                return NotFound("File not found");
            }

            return File(fileContents, document.FileType, document.Name);
        }

        // GET: api/documents/5/url
        [HttpGet("{id}/url")]
        public async Task<ActionResult<string>> GetDocumentUrl(int id)
        {
            var document = await _documentService.GetDocumentByIdAsync(id);
            if (document == null)
            {
                return NotFound();
            }

            var url = await _documentService.GetDocumentUrlAsync(id);
            return Ok(new { url });
        }

        // POST: api/documents
        [HttpPost]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<ActionResult<Document>> UploadDocument([FromForm] DocumentUploadRequest request)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            if (request.File == null || request.File.Length == 0)
            {
                return BadRequest("File is required");
            }

            var document = new Document
            {
                Name = request.Name,
                Description = request.Description,
                DocumentType = request.DocumentType,
                ProjectId = request.ProjectId,
                UploadedById = int.Parse(User.FindFirst("UserId")?.Value ?? "0"),
                ExpiryDate = request.ExpiryDate
            };

            try
            {
                var createdDocument = await _documentService.CreateDocumentAsync(document, request.File);
                return CreatedAtAction(nameof(GetDocument), new { id = createdDocument.Id }, createdDocument);
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Internal server error: {ex.Message}");
            }
        }

        // PUT: api/documents/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> UpdateDocument(int id, Document document)
        {
            if (id != document.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _documentService.UpdateDocumentAsync(document);
                return NoContent();
            }
            catch (Exception)
            {
                var existingDocument = await _documentService.GetDocumentByIdAsync(id);
                if (existingDocument == null)
                {
                    return NotFound();
                }
                throw;
            }
        }

        // DELETE: api/documents/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> DeleteDocument(int id)
        {
            var result = await _documentService.DeleteDocumentAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }

    public class DocumentUploadRequest
    {
        public string Name { get; set; } = string.Empty;
        public string? Description { get; set; }
        public string DocumentType { get; set; } = string.Empty;
        public int? ProjectId { get; set; }
        public DateTime? ExpiryDate { get; set; }
        public IFormFile File { get; set; } = null!;
    }
}
