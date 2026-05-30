using Microsoft.AspNetCore.Mvc;
using Platform.Api.Models.Auth;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/auth")]
public class AuthController : ControllerBase
{
  private readonly AuthService _authService;

  public AuthController(AuthService authService)
  {
    _authService = authService;
  }

  [HttpPost("login")]
  public async Task<ActionResult<LoginResponse>> Login(LoginRequest request)
  {
    if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
    {
      return BadRequest("Email and password are required");
    }

    var result = await _authService.AuthenticateAsync(request.Email, request.Password);
    if (!result.Success)
    {
      return Unauthorized();
    }

    return new LoginResponse
    {
      Token = result.Token,
      ExpiresAtUtc = result.ExpiresAtUtc,
      Role = result.Role,
      UserId = result.UserId
    };
  }

  [HttpPost("logout")]
  public IActionResult Logout()
  {
    return Ok(new { message = "Logged out" });
  }

  [HttpPost("register")]
  public async Task<ActionResult<LoginResponse>> Register(RegisterRequest request)
  {
    if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
    {
      return BadRequest("Email and password are required");
    }

    var result = await _authService.RegisterAsync(
      request.FullName,
      request.Email,
      request.Phone,
      request.Role,
      request.Password
    );

    if (!result.Success)
    {
      return Conflict(result.Error);
    }

    return new LoginResponse
    {
      Token = result.Token,
      ExpiresAtUtc = result.ExpiresAtUtc,
      Role = result.Role,
      UserId = result.UserId
    };
  }
}
