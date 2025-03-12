using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public interface IPropertyValuationService
    {
        Task<PropertyValuation?> GetPropertyValuationByIdAsync(int id);
        Task<List<PropertyValuation>> GetAllPropertyValuationsAsync();
        Task<List<PropertyValuation>> GetPropertyValuationsByProjectIdAsync(int projectId);
        Task<List<PropertyValuation>> GetPropertyValuationsByAddressAsync(string address);
        Task<PropertyValuation> CreatePropertyValuationAsync(PropertyValuation propertyValuation);
        Task UpdatePropertyValuationAsync(PropertyValuation propertyValuation);
        Task<bool> DeletePropertyValuationAsync(int id);
        Task<decimal> GetAverageValuationByProjectIdAsync(int projectId);
        Task<decimal> GetValuationGrowthPercentageAsync(int projectId);
        Task<List<PropertyValuation>> GetRecentValuationsAsync(int count);
    }
}
