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
  public ActionResult<LoginResponse> Login(LoginRequest request)
  {
    if (string.IsNullOrWhiteSpace(request.Email))
    {
      return BadRequest("Email is required");
    }

    var (token, expiresAtUtc) = _authService.GenerateToken(request.Email, "Client");
    return new LoginResponse
    {
      Token = token,
      ExpiresAtUtc = expiresAtUtc
    };
  }
}
