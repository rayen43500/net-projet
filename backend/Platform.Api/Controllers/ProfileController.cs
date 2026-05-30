using Microsoft.AspNetCore.Mvc;
using MongoDB.Driver;
using Platform.Api.Data;
using Platform.Api.Models.Profile;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/profile")]
public class ProfileController : ControllerBase
{
  private readonly MongoDbContext _context;

  public ProfileController(MongoDbContext context)
  {
    _context = context;
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<ProfileResponse>> GetById(string id)
  {
    var user = await _context.Users.Find(item => item.Id == id).FirstOrDefaultAsync();
    if (user == null)
    {
      return NotFound();
    }

    return new ProfileResponse
    {
      Id = user.Id,
      Email = user.Email,
      FullName = user.FullName,
      Role = user.Role,
      Phone = user.Phone,
      TeamId = user.TeamId,
      AvatarUrl = user.AvatarUrl
    };
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, UpdateProfileRequest request)
  {
    var user = await _context.Users.Find(item => item.Id == id).FirstOrDefaultAsync();
    if (user == null)
    {
      return NotFound();
    }

    user.FullName = request.FullName;
    user.Phone = request.Phone;
    user.TeamId = request.TeamId;
    user.AvatarUrl = request.AvatarUrl;
    user.UpdatedAtUtc = DateTime.UtcNow;

    await _context.Users.ReplaceOneAsync(item => item.Id == user.Id, user);
    return NoContent();
  }
}
