using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/tasks")]
public class TasksController : ControllerBase
{
  private readonly CrudService<TaskItem> _service;

  public TasksController(CrudService<TaskItem> service)
  {
    _service = service;
  }

  [HttpGet]
  public Task<List<TaskItem>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<TaskItem>> GetById(string id)
  {
    var task = await _service.GetByIdAsync(id);
    if (task == null)
    {
      return NotFound();
    }

    return task;
  }

  [HttpPost]
  public async Task<ActionResult<TaskItem>> Create(TaskItem task)
  {
    var created = await _service.CreateAsync(task);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, TaskItem task)
  {
    var success = await _service.UpdateAsync(id, task);
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
