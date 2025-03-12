using Microsoft.AspNetCore.Mvc;
using ReactAppUrbanRenewal.Server.Models;
using ReactAppUrbanRenewal.Server.Services;
using System.ComponentModel.DataAnnotations;

namespace ReactAppUrbanRenewal.Server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly IUserService _userService;

        public AuthController(IUserService userService)
        {
            _userService = userService;
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login(LoginRequest loginRequest)
        {
            // Validate user credentials
            bool isValid = await _userService.VerifyUserCredentialsAsync(loginRequest.Username, loginRequest.Password);
            if (!isValid)
            {
                return Unauthorized(new { message = "Invalid username or password" });
            }

            // Get user details
            var user = await _userService.GetUserByUsernameAsync(loginRequest.Username);
            if (user == null)
            {
                return NotFound(new { message = "User not found" });
            }

            // Update last login timestamp
            user.LastLogin = DateTime.UtcNow;
            await _userService.UpdateUserAsync(user);

            // Generate JWT token
            string token = await _userService.GenerateJwtTokenAsync(user);

            // Return token and user information
            return Ok(new
            {
                token,
                user = new
                {
                    id = user.Id,
                    username = user.Username,
                    email = user.Email,
                    role = user.Role
                }
            });
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register(RegisterRequest registerRequest)
        {
            // Check if username already exists
            var existingUserByUsername = await _userService.GetUserByUsernameAsync(registerRequest.Username);
            if (existingUserByUsername != null)
            {
                return BadRequest(new { message = "Username already exists" });
            }

            // Check if email already exists
            var existingUserByEmail = await _userService.GetUserByEmailAsync(registerRequest.Email);
            if (existingUserByEmail != null)
            {
                return BadRequest(new { message = "Email already exists" });
            }

            // Create new user
            var user = new User
            {
                Username = registerRequest.Username,
                Email = registerRequest.Email,
                Role = "User", // Default role
                PhoneNumber = registerRequest.PhoneNumber
            };

            try
            {
                var createdUser = await _userService.CreateUserAsync(user, registerRequest.Password);

                // Generate JWT token
                string token = await _userService.GenerateJwtTokenAsync(createdUser);

                // Return token and user information
                return Ok(new
                {
                    token,
                    user = new
                    {
                        id = createdUser.Id,
                        username = createdUser.Username,
                        email = createdUser.Email,
                        role = createdUser.Role
                    }
                });
            }
            catch (Exception ex)
            {
                return BadRequest(new { message = ex.Message });
            }
        }
    }

    public class LoginRequest
    {
        [Required]
        public string Username { get; set; } = string.Empty;

        [Required]
        public string Password { get; set; } = string.Empty;
    }

    public class RegisterRequest
    {
        [Required]
        [StringLength(50, MinimumLength = 3)]
        public string Username { get; set; } = string.Empty;

        [Required]
        [EmailAddress]
        public string Email { get; set; } = string.Empty;

        [Required]
        [StringLength(100, MinimumLength = 6)]
        public string Password { get; set; } = string.Empty;

        [Phone]
        public string? PhoneNumber { get; set; }
    }
}
