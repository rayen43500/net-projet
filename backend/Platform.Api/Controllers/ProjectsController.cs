using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/projects")]
public class ProjectsController : ControllerBase
{
  private readonly ProjectService _service;

  public ProjectsController(ProjectService service)
  {
    _service = service;
  }

  [HttpGet]
  public Task<List<Project>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Project>> GetById(string id)
  {
    var project = await _service.GetByIdAsync(id);
    if (project == null)
    {
      return NotFound();
    }

    return project;
  }

  [HttpPost]
  public async Task<ActionResult<Project>> Create(Project project)
  {
    var created = await _service.CreateAsync(project);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, Project project)
  {
    var success = await _service.UpdateAsync(id, project);
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
