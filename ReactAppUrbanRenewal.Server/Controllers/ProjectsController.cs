using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactAppUrbanRenewal.Server.Models;
using ReactAppUrbanRenewal.Server.Services;

namespace ReactAppUrbanRenewal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProjectsController : ControllerBase
    {
        private readonly IProjectService _projectService;

        public ProjectsController(IProjectService projectService)
        {
            _projectService = projectService;
        }

        // GET: api/projects
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjects()
        {
            var projects = await _projectService.GetAllProjectsAsync();
            return Ok(projects);
        }

        // GET: api/projects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Project>> GetProject(int id)
        {
            var project = await _projectService.GetProjectByIdAsync(id);

            if (project == null)
            {
                return NotFound();
            }

            return Ok(project);
        }

        // GET: api/projects/status/InProgress
        [HttpGet("status/{status}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjectsByStatus(string status)
        {
            var projects = await _projectService.GetProjectsByStatusAsync(status);
            return Ok(projects);
        }

        // GET: api/projects/location/Tel%20Aviv
        [HttpGet("location/{location}")]
        public async Task<ActionResult<IEnumerable<Project>>> GetProjectsByLocation(string location)
        {
            var projects = await _projectService.GetProjectsByLocationAsync(location);
            return Ok(projects);
        }

        // GET: api/projects/5/documents
        [HttpGet("{id}/documents")]
        public async Task<ActionResult<IEnumerable<Document>>> GetProjectDocuments(int id)
        {
            var documents = await _projectService.GetProjectDocumentsAsync(id);
            return Ok(documents);
        }

        // GET: api/projects/5/tenders
        [HttpGet("{id}/tenders")]
        public async Task<ActionResult<IEnumerable<Tender>>> GetProjectTenders(int id)
        {
            var tenders = await _projectService.GetProjectTendersAsync(id);
            return Ok(tenders);
        }

        // GET: api/projects/5/valuations
        [HttpGet("{id}/valuations")]
        public async Task<ActionResult<IEnumerable<PropertyValuation>>> GetProjectValuations(int id)
        {
            var valuations = await _projectService.GetProjectValuationsAsync(id);
            return Ok(valuations);
        }

        // GET: api/projects/5/reports
        [HttpGet("{id}/reports")]
        public async Task<ActionResult<IEnumerable<Report>>> GetProjectReports(int id)
        {
            var reports = await _projectService.GetProjectReportsAsync(id);
            return Ok(reports);
        }

        // GET: api/projects/5/totalvalue
        [HttpGet("{id}/totalvalue")]
        public async Task<ActionResult<decimal>> GetProjectTotalValue(int id)
        {
            var totalValue = await _projectService.GetProjectTotalValueAsync(id);
            return Ok(totalValue);
        }

        // POST: api/projects
        [HttpPost]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<ActionResult<Project>> CreateProject(Project project)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdProject = await _projectService.CreateProjectAsync(project);
            return CreatedAtAction(nameof(GetProject), new { id = createdProject.Id }, createdProject);
        }

        // PUT: api/projects/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> UpdateProject(int id, Project project)
        {
            if (id != project.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _projectService.UpdateProjectAsync(project);
                return NoContent();
            }
            catch (Exception)
            {
                var existingProject = await _projectService.GetProjectByIdAsync(id);
                if (existingProject == null)
                {
                    return NotFound();
                }
                throw;
            }
        }

        // DELETE: api/projects/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteProject(int id)
        {
            var result = await _projectService.DeleteProjectAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }
    }
}
