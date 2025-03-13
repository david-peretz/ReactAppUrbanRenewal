using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactAppUrbanRenewal.Server.Models;
using ReactAppUrbanRenewal.Server.Services;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace ReactAppUrbanRenewal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class TendersController : ControllerBase
    {
        private readonly ITenderService _tenderService;

        public TendersController(ITenderService tenderService)
        {
            _tenderService = tenderService;
        }

        // GET: api/tenders
        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetTenders()
        {
            var tenders = await _tenderService.GetAllTendersAsync();

            // Map to anonymous objects to break circular references
            var result = tenders.Select(t => new
            {
                t.Id,
                t.Title,
                t.Description,
                t.ReleaseDate,
                t.SubmissionDeadline,
                t.EstimatedValue,
                t.Status,
                t.AwardedTo,
                t.AwardedAmount,
                t.AwardedDate,
                t.RequiredQualifications,
                t.EvaluationCriteria,
                t.CreatedAt,
                t.UpdatedAt,
                t.ProjectId,
                ProjectName = t.Project?.Name ?? "Unknown"
            });

            return Ok(result);
        }

        // GET: api/tenders/5
        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetTender(int id)
        {
            var tender = await _tenderService.GetTenderByIdAsync(id);

            if (tender == null)
            {
                return NotFound();
            }

            // Map to anonymous object to break circular references
            var result = new
            {
                tender.Id,
                tender.Title,
                tender.Description,
                tender.ReleaseDate,
                tender.SubmissionDeadline,
                tender.EstimatedValue,
                tender.Status,
                tender.AwardedTo,
                tender.AwardedAmount,
                tender.AwardedDate,
                tender.RequiredQualifications,
                tender.EvaluationCriteria,
                tender.CreatedAt,
                tender.UpdatedAt,
                tender.ProjectId,
                ProjectName = tender.Project?.Name ?? "Unknown",
            };

            return Ok(result);
        }

        // GET: api/tenders/status/open
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<object>>> GetTendersByStatus(string status)
        {
            var tenders = await _tenderService.GetTendersByStatusAsync(status);

            // Map to anonymous objects to break circular references
            var result = tenders.Select(t => new
            {
                t.Id,
                t.Title,
                t.Description,
                t.ReleaseDate,
                t.SubmissionDeadline,
                t.EstimatedValue,
                t.Status,
                t.AwardedTo,
                t.AwardedAmount,
                t.AwardedDate,
                t.RequiredQualifications,
                t.EvaluationCriteria,
                t.CreatedAt,
                t.UpdatedAt,
                t.ProjectId,
                ProjectName = t.Project?.Name ?? "Unknown"
            });

            return Ok(result);
        }

        // POST: api/tenders
        [HttpPost]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<ActionResult<Tender>> CreateTender(Tender tender)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdTender = await _tenderService.CreateTenderAsync(tender);
            return CreatedAtAction(nameof(GetTender), new { id = createdTender.Id }, createdTender);
        }

        // PUT: api/tenders/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> UpdateTender(int id, Tender tender)
        {
            if (id != tender.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _tenderService.UpdateTenderAsync(tender);
                return NoContent();
            }
            catch (System.Exception)
            {
                var existingTender = await _tenderService.GetTenderByIdAsync(id);
                if (existingTender == null)
                {
                    return NotFound();
                }
                throw;
            }
        }

        // DELETE: api/tenders/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteTender(int id)
        {
            var result = await _tenderService.DeleteTenderAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // GET: api/tenders/open
        [HttpGet("open")]
        public async Task<ActionResult<IEnumerable<object>>> GetOpenTenders()
        {
            var tenders = await _tenderService.GetOpenTendersAsync();

            // Map to anonymous objects to break circular references
            var result = tenders.Select(t => new
            {
                t.Id,
                t.Title,
                t.Description,
                t.ReleaseDate,
                t.SubmissionDeadline,
                t.EstimatedValue,
                t.Status,
                t.AwardedTo,
                t.AwardedAmount,
                t.AwardedDate,
                t.RequiredQualifications,
                t.EvaluationCriteria,
                t.CreatedAt,
                t.UpdatedAt,
                t.ProjectId,
                ProjectName = t.Project?.Name ?? "Unknown"
            });

            return Ok(result);
        }

        // GET: api/tenders/closing-soon/{days}
        [HttpGet("closing-soon/{days}")]
        public async Task<ActionResult<IEnumerable<object>>> GetTendersClosingSoon(int days)
        {
            var tenders = await _tenderService.GetTendersClosingSoonAsync(days);

            // Map to anonymous objects to break circular references
            var result = tenders.Select(t => new
            {
                t.Id,
                t.Title,
                t.Description,
                t.ReleaseDate,
                t.SubmissionDeadline,
                t.EstimatedValue,
                t.Status,
                t.AwardedTo,
                t.AwardedAmount,
                t.AwardedDate,
                t.RequiredQualifications,
                t.EvaluationCriteria,
                t.CreatedAt,
                t.UpdatedAt,
                t.ProjectId,
                ProjectName = t.Project?.Name ?? "Unknown"
            });

            return Ok(result);
        }

        // PUT: api/tenders/{id}/award
        [HttpPut("{id}/award")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> AwardTender(int id, [FromBody] AwardTenderModel model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var result = await _tenderService.AwardTenderAsync(id, model.AwardedTo, model.AwardedAmount);
            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
