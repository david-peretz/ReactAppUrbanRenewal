using ReactAppUrbanRenewal.Server.Models;

namespace ReactAppUrbanRenewal.Server.Services
{
    public interface IUserService
    {
        Task<User?> GetUserByIdAsync(int id);
        Task<List<User>> GetAllUsersAsync();
        Task<User?> GetUserByUsernameAsync(string username);
        Task<User?> GetUserByEmailAsync(string email);
        Task<User> CreateUserAsync(User user, string password);
        Task UpdateUserAsync(User user);
        Task<bool> DeleteUserAsync(int id);
        Task<bool> VerifyUserCredentialsAsync(string username, string password);
        Task<string> GenerateJwtTokenAsync(User user);
    }
}
