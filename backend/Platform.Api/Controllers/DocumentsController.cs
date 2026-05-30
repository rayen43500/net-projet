using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/documents")]
public class DocumentsController : ControllerBase
{
  private readonly CrudService<DocumentItem> _service;

  public DocumentsController(CrudService<DocumentItem> service)
  {
    _service = service;
  }

  [HttpGet]
  public Task<List<DocumentItem>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<DocumentItem>> GetById(string id)
  {
    var item = await _service.GetByIdAsync(id);
    if (item == null)
    {
      return NotFound();
    }

    return item;
  }

  [HttpPost]
  public async Task<ActionResult<DocumentItem>> Create(DocumentItem item)
  {
    var created = await _service.CreateAsync(item);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, DocumentItem item)
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
