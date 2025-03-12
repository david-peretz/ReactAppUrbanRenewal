using Microsoft.EntityFrameworkCore;
using ReactAppUrbanRenewal.Server.Data;
using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public class PropertyValuationService : IPropertyValuationService
    {
        private readonly ApplicationDbContext _context;

        public PropertyValuationService(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PropertyValuation?> GetPropertyValuationByIdAsync(int id)
        {
            return await _context.PropertyValuations
                .Include(pv => pv.Project)
                .FirstOrDefaultAsync(pv => pv.Id == id);
        }

        public async Task<List<PropertyValuation>> GetAllPropertyValuationsAsync()
        {
            return await _context.PropertyValuations
                .Include(pv => pv.Project)
                .ToListAsync();
        }

        public async Task<List<PropertyValuation>> GetPropertyValuationsByProjectIdAsync(int projectId)
        {
            return await _context.PropertyValuations
                .Where(pv => pv.ProjectId == projectId)
                .ToListAsync();
        }

        public async Task<List<PropertyValuation>> GetPropertyValuationsByAddressAsync(string address)
        {
            return await _context.PropertyValuations
                .Where(pv => pv.PropertyAddress.Contains(address))
                .ToListAsync();
        }

        public async Task<PropertyValuation> CreatePropertyValuationAsync(PropertyValuation propertyValuation)
        {
            propertyValuation.CreatedAt = DateTime.UtcNow;

            _context.PropertyValuations.Add(propertyValuation);
            await _context.SaveChangesAsync();

            return propertyValuation;
        }

        public async Task UpdatePropertyValuationAsync(PropertyValuation propertyValuation)
        {
            propertyValuation.UpdatedAt = DateTime.UtcNow;

            _context.Entry(propertyValuation).State = EntityState.Modified;
            await _context.SaveChangesAsync();
        }

        public async Task<bool> DeletePropertyValuationAsync(int id)
        {
            var propertyValuation = await _context.PropertyValuations.FindAsync(id);
            if (propertyValuation == null)
            {
                return false;
            }

            _context.PropertyValuations.Remove(propertyValuation);
            await _context.SaveChangesAsync();
            return true;
        }

        public async Task<decimal> GetAverageValuationByProjectIdAsync(int projectId)
        {
            var valuations = await _context.PropertyValuations
                .Where(pv => pv.ProjectId == projectId)
                .ToListAsync();

            if (valuations.Count == 0)
            {
                return 0;
            }

            return valuations.Average(v => v.MarketValue);
        }

        public async Task<decimal> GetValuationGrowthPercentageAsync(int projectId)
        {
            var valuations = await _context.PropertyValuations
                .Where(pv => pv.ProjectId == projectId)
                .ToListAsync();

            if (valuations.Count == 0)
            {
                return 0;
            }

            decimal totalCurrentValue = valuations.Sum(v => v.MarketValue);
            decimal totalEstimatedFutureValue = valuations.Sum(v => v.PostRenewalEstimatedValue);

            if (totalCurrentValue == 0)
            {
                return 0;
            }

            return ((totalEstimatedFutureValue - totalCurrentValue) / totalCurrentValue) * 100;
        }

        public async Task<List<PropertyValuation>> GetRecentValuationsAsync(int count)
        {
            return await _context.PropertyValuations
                .Include(pv => pv.Project)
                .OrderByDescending(pv => pv.ValuationDate)
                .Take(count)
                .ToListAsync();
        }
    }
}
