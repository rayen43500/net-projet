using Microsoft.AspNetCore.Mvc;
using Platform.Api.Models.Workflow;
using Platform.Api.Services;

namespace Platform.Api.Controllers;

[ApiController]
[Route("api/workflow")]
public class WorkflowController : ControllerBase
{
  private readonly WorkflowService _service;

  public WorkflowController(WorkflowService service)
  {
    _service = service;
  }

  [HttpPost("quote-requests/{id}/quote")]
  public async Task<IActionResult> CreateQuoteFromRequest(string id, CreateQuoteFromRequestRequest request)
  {
    var quote = await _service.CreateQuoteFromRequestAsync(id, request.Subtotal, request.TaxRate, request.ValidUntil);
    if (quote == null)
    {
      return BadRequest("Quote request not found or invalid status.");
    }

    return Ok(quote);
  }

  [HttpPost("quotes/{id}/approve")]
  public async Task<IActionResult> ApproveQuote(string id, ApproveQuoteRequest request)
  {
    var project = await _service.ApproveQuoteAsync(id, request.ProjectName, request.ProjectDescription, request.StartDate);
    if (project == null)
    {
      return BadRequest("Quote not found or not pending approval.");
    }

    return Ok(project);
  }

  [HttpPost("projects/{id}/deliver")]
  public async Task<IActionResult> DeliverProject(string id, DeliverProjectRequest request)
  {
    var invoice = await _service.DeliverProjectAsync(id, request.Subtotal, request.TaxRate, request.DueOn);
    if (invoice == null)
    {
      return BadRequest("Project not found or not active.");
    }

    return Ok(invoice);
  }

  [HttpPost("invoices/{id}/payments")]
  public async Task<IActionResult> RecordPayment(string id, RecordPaymentRequest request)
  {
    var payment = await _service.RecordPaymentAsync(id, request.Amount, request.Method);
    if (payment == null)
    {
      return BadRequest("Invoice not found or already paid.");
    }

    return Ok(payment);
  }
}
