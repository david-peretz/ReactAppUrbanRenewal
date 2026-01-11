using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ReactAppUrbanRenewal.Server.Models;
using ReactAppUrbanRenewal.Server.Services;

namespace ReactAppUrbanRenewal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomersController : ControllerBase
    {
        private readonly ICustomerService _customerService;

        public CustomersController(ICustomerService customerService)
        {
            _customerService = customerService;
        }

        // GET: api/customers
        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomers()
        {
            var customers = await _customerService.GetAllCustomersAsync();
            return Ok(customers);
        }

        // GET: api/customers/5
        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomer(int id)
        {
            var customer = await _customerService.GetCustomerByIdAsync(id);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // GET: api/customers/type/Resident
        [HttpGet("type/{customerType}")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomersByType(string customerType)
        {
            var customers = await _customerService.GetCustomersByTypeAsync(customerType);
            return Ok(customers);
        }

        // GET: api/customers/identification/123456789
        [HttpGet("identification/{identificationNumber}")]
        public async Task<ActionResult<Customer>> GetCustomerByIdentification(string identificationNumber)
        {
            var customer = await _customerService.GetCustomerByIdentificationNumberAsync(identificationNumber);

            if (customer == null)
            {
                return NotFound();
            }

            return Ok(customer);
        }

        // GET: api/customers/5/projects
        [HttpGet("{id}/projects")]
        public async Task<ActionResult<IEnumerable<Project>>> GetCustomerProjects(int id)
        {
            var projects = await _customerService.GetCustomerProjectsAsync(id);
            return Ok(projects);
        }

        // POST: api/customers
        [HttpPost]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<ActionResult<Customer>> CreateCustomer(Customer customer)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var createdCustomer = await _customerService.CreateCustomerAsync(customer);
            return CreatedAtAction(nameof(GetCustomer), new { id = createdCustomer.Id }, createdCustomer);
        }

        // PUT: api/customers/5
        [HttpPut("{id}")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> UpdateCustomer(int id, Customer customer)
        {
            if (id != customer.Id)
            {
                return BadRequest();
            }

            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            try
            {
                await _customerService.UpdateCustomerAsync(customer);
                return NoContent();
            }
            catch (Exception)
            {
                var existingCustomer = await _customerService.GetCustomerByIdAsync(id);
                if (existingCustomer == null)
                {
                    return NotFound();
                }
                throw;
            }
        }

        // DELETE: api/customers/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> DeleteCustomer(int id)
        {
            var result = await _customerService.DeleteCustomerAsync(id);

            if (!result)
            {
                return NotFound();
            }

            return NoContent();
        }

        // POST: api/customers/5/projects/3
        [HttpPost("{customerId}/projects/{projectId}")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> AddCustomerToProject(int customerId, int projectId)
        {
            try
            {
                await _customerService.AddCustomerToProjectAsync(customerId, projectId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }

        // DELETE: api/customers/5/projects/3
        [HttpDelete("{customerId}/projects/{projectId}")]
        [Authorize(Roles = "Administrator,Manager")]
        public async Task<IActionResult> RemoveCustomerFromProject(int customerId, int projectId)
        {
            try
            {
                await _customerService.RemoveCustomerFromProjectAsync(customerId, projectId);
                return NoContent();
            }
            catch (Exception ex)
            {
                return BadRequest(ex.Message);
            }
        }
    }
}
