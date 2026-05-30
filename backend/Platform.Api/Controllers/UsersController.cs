using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Security;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/users")]
public class UsersController : ControllerBase
{
  private readonly CrudService<User> _service;

  public UsersController(CrudService<User> service)
  {
    _service = service;
  }

  [HttpGet]
  public async Task<List<UserAdminResponse>> GetAll()
  {
    var users = await _service.GetAllAsync();
    return users.Select(ToResponse).ToList();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<UserAdminResponse>> GetById(string id)
  {
    var user = await _service.GetByIdAsync(id);
    if (user == null)
    {
      return NotFound();
    }

    return ToResponse(user);
  }

  [HttpPost]
  public async Task<ActionResult<UserAdminResponse>> Create(UserAdminRequest request)
  {
    if (string.IsNullOrWhiteSpace(request.Email) || string.IsNullOrWhiteSpace(request.Password))
    {
      return BadRequest("Email and password are required");
    }

    var salt = PasswordHasher.GenerateSalt();
    var user = new User
    {
      Email = Clean(request.Email),
      FullName = Clean(request.FullName),
      Phone = Clean(request.Phone),
      Role = NormalizeRole(request.Role),
      TeamId = Clean(request.TeamId),
      AvatarUrl = Clean(request.AvatarUrl),
      PasswordSalt = salt,
      PasswordHash = PasswordHasher.Hash(request.Password, salt)
    };

    var created = await _service.CreateAsync(user);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, ToResponse(created));
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, UserAdminRequest request)
  {
    var existing = await _service.GetByIdAsync(id);
    if (existing == null)
    {
      return NotFound();
    }

    existing.Email = Clean(request.Email);
    existing.FullName = Clean(request.FullName);
    existing.Phone = Clean(request.Phone);
    existing.Role = NormalizeRole(request.Role);
    existing.TeamId = Clean(request.TeamId);
    existing.AvatarUrl = Clean(request.AvatarUrl);

    if (!string.IsNullOrWhiteSpace(request.Password))
    {
      var salt = PasswordHasher.GenerateSalt();
      existing.PasswordSalt = salt;
      existing.PasswordHash = PasswordHasher.Hash(request.Password, salt);
    }

    var success = await _service.UpdateAsync(id, existing);
    return success ? NoContent() : NotFound();
  }

  [HttpDelete("{id}")]
  public async Task<IActionResult> Delete(string id)
  {
    var success = await _service.DeleteAsync(id);
    if (!success)
    {
      return NotFound();
    }

    return NoContent();
  }

  private static UserAdminResponse ToResponse(User user)
  {
    return new UserAdminResponse
    {
      Id = user.Id,
      Email = user.Email,
      FullName = user.FullName,
      Role = user.Role,
      Phone = user.Phone,
      TeamId = user.TeamId,
      AvatarUrl = user.AvatarUrl,
      CreatedAtUtc = user.CreatedAtUtc,
      UpdatedAtUtc = user.UpdatedAtUtc
    };
  }

  private static string NormalizeRole(string role)
  {
    return Clean(role) switch
    {
      "Admin" => "Admin",
      "Manager" => "Manager",
      "Developer" => "Developer",
      "Client" => "Client",
      _ => "Client"
    };
  }

  private static string Clean(string? value)
  {
    return value?.Trim() ?? string.Empty;
  }
}

public class UserAdminRequest
{
  public string Email { get; set; } = string.Empty;
  public string FullName { get; set; } = string.Empty;
  public string Role { get; set; } = "Client";
  public string Phone { get; set; } = string.Empty;
  public string TeamId { get; set; } = string.Empty;
  public string AvatarUrl { get; set; } = string.Empty;
  public string Password { get; set; } = string.Empty;
}

public class UserAdminResponse
{
  public string Id { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string FullName { get; set; } = string.Empty;
  public string Role { get; set; } = "Client";
  public string Phone { get; set; } = string.Empty;
  public string TeamId { get; set; } = string.Empty;
  public string AvatarUrl { get; set; } = string.Empty;
  public DateTime CreatedAtUtc { get; set; }
  public DateTime UpdatedAtUtc { get; set; }
}
