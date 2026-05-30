using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/quote-requests")]
public class QuoteRequestsController : ControllerBase
{
  private readonly CrudService<QuoteRequest> _service;

  public QuoteRequestsController(CrudService<QuoteRequest> service)
  {
    _service = service;
  }

  [HttpGet]
  public Task<List<QuoteRequest>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<QuoteRequest>> GetById(string id)
  {
    var item = await _service.GetByIdAsync(id);
    if (item == null)
    {
      return NotFound();
    }

    return item;
  }

  [HttpPost]
  public async Task<ActionResult<QuoteRequest>> Create(QuoteRequest item)
  {
    var created = await _service.CreateAsync(item);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, QuoteRequest item)
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
