using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public interface ICustomerService
    {
        Task<Customer?> GetCustomerByIdAsync(int id);
        Task<List<Customer>> GetAllCustomersAsync();
        Task<List<Customer>> GetCustomersByTypeAsync(string customerType);
        Task<Customer?> GetCustomerByIdentificationNumberAsync(string identificationNumber);
        Task<Customer> CreateCustomerAsync(Customer customer);
        Task UpdateCustomerAsync(Customer customer);
        Task<bool> DeleteCustomerAsync(int id);
        Task<List<Project>> GetCustomerProjectsAsync(int customerId);
        Task AddCustomerToProjectAsync(int customerId, int projectId);
        Task RemoveCustomerFromProjectAsync(int customerId, int projectId);
    }
}
