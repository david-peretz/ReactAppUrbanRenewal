using Microsoft.EntityFrameworkCore;
using ReactAppUrbanRenewal.Server.Data;
using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public class CustomerService : ICustomerService
    {
        private readonly ApplicationDbContext _context;

        public CustomerService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<Customer?> GetCustomerByIdAsync(int id)
        {
            return await _context.Customers.FindAsync(id);
        }

        public async Task<List<Customer>> GetAllCustomersAsync()
        {
            return await _context.Customers.ToListAsync();
        }

        public async Task<List<Customer>> GetCustomersByTypeAsync(string customerType)
        {
            return await _context.Customers
                .Where(c => c.CustomerType == customerType)
                .ToListAsync();
        }

        public async Task<Customer?> GetCustomerByIdentificationNumberAsync(string identificationNumber)
        {
            return await _context.Customers
                .FirstOrDefaultAsync(c => c.IdentificationNumber == identificationNumber);
        }

        public async Task<Customer> CreateCustomerAsync(Customer customer)
        {
            customer.CreatedAt = DateTime.UtcNow;

            _context.Customers.Add(customer);
            await _context.SaveChangesAsync();

            return customer;
        }

        public async Task UpdateCustomerAsync(Customer customer)
        {
            customer.UpdatedAt = DateTime.UtcNow;

            _context.Entry(customer).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeleteCustomerAsync(int id)
        {
            var customer = await _context.Customers.FindAsync(id);
            if (customer == null)
            {
                return false;
            }

            _context.Customers.Remove(customer);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<List<Project>> GetCustomerProjectsAsync(int customerId)
        {
            var customer = await _context.Customers
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.Id == customerId);

            return customer?.Projects.ToList() ?? new List<Project>();
        }

        public async Task AddCustomerToProjectAsync(int customerId, int projectId)
        {
            var customer = await _context.Customers
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.Id == customerId);

            var project = await _context.Projects.FindAsync(projectId);

            if (customer == null || project == null)
            {
                throw new ArgumentException("Customer or project not found");
            }

            if (!customer.Projects.Contains(project))
            {
                customer.Projects.Add(project);
                await _context.SaveChangesAsync();
            }
        }

        public async Task RemoveCustomerFromProjectAsync(int customerId, int projectId)
        {
            var customer = await _context.Customers
                .Include(c => c.Projects)
                .FirstOrDefaultAsync(c => c.Id == customerId);

            var project = await _context.Projects.FindAsync(projectId);

            if (customer == null || project == null)
            {
                throw new ArgumentException("Customer or project not found");
            }

            if (customer.Projects.Contains(project))
            {
                customer.Projects.Remove(project);
                await _context.SaveChangesAsync();
            }
        }
    }
}
