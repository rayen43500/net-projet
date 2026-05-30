using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/roles")]
public class RolesController : ControllerBase
{
  private readonly CrudService<Role> _service;

  public RolesController(CrudService<Role> service)
  {
    _service = service;
  }

  [HttpGet]
  public Task<List<Role>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Role>> GetById(string id)
  {
    var item = await _service.GetByIdAsync(id);
    if (item == null)
    {
      return NotFound();
    }

    return item;
  }

  [HttpPost]
  public async Task<ActionResult<Role>> Create(Role item)
  {
    var created = await _service.CreateAsync(item);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, Role item)
  {
    var success = await _service.UpdateAsync(id, item);
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
