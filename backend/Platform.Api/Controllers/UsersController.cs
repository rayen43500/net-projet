using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
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
  public Task<List<User>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<User>> GetById(string id)
  {
    var user = await _service.GetByIdAsync(id);
    if (user == null)
    {
      return NotFound();
    }

    return user;
  }

  [HttpPost]
  public async Task<ActionResult<User>> Create(User user)
  {
    var created = await _service.CreateAsync(user);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, User user)
  {
    var success = await _service.UpdateAsync(id, user);
    if (!success)
    {
      return NotFound();
    }

    return NoContent();
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
}
