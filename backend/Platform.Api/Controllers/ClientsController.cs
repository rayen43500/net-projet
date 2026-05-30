using Microsoft.AspNetCore.Mvc;
using Platform.Api.Entities;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/clients")]
public class ClientsController : ControllerBase
{
  private readonly CrudService<Client> _service;

  public ClientsController(CrudService<Client> service)
  {
    _service = service;
  }

  [HttpGet]
  public Task<List<Client>> GetAll()
  {
    return _service.GetAllAsync();
  }

  [HttpGet("{id}")]
  public async Task<ActionResult<Client>> GetById(string id)
  {
    var client = await _service.GetByIdAsync(id);
    if (client == null)
    {
      return NotFound();
    }

    return client;
  }

  [HttpPost]
  public async Task<ActionResult<Client>> Create(Client client)
  {
    var created = await _service.CreateAsync(client);
    return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
  }

  [HttpPut("{id}")]
  public async Task<IActionResult> Update(string id, Client client)
  {
    var success = await _service.UpdateAsync(id, client);
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
