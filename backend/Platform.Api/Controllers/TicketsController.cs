using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/tickets")]
public class TicketsController : ControllerBase
{
  private readonly CrudService<Ticket> _service;

  public TicketsController(CrudService<Ticket> service)
  {
    _service = service;
  }

  [HttpGet]
  public Task<List<Ticket>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Ticket>> GetById(string id)
  {
    var ticket = await _service.GetByIdAsync(id);
    if (ticket == null)
    {
      return NotFound();
    }

    return ticket;
  }

  [HttpPost]
  public async Task<ActionResult<Ticket>> Create(Ticket ticket)
  {
    var created = await _service.CreateAsync(ticket);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, Ticket ticket)
  {
    var success = await _service.UpdateAsync(id, ticket);
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
