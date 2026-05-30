using MongoDB.Driver;
using Platform.Api.Data;
using Platform.Api.Entities;

namespace Platform.Api.Services;

public class WorkflowService
{
  private readonly MongoDbContext _context;

  public WorkflowService(MongoDbContext context)
  {
    _context = context;
  }

  public async Task<Quote?> CreateQuoteFromRequestAsync(string quoteRequestId, decimal subtotal, decimal taxRate, DateTime? validUntil)
  {
    var request = await _context.QuoteRequests.Find(item => item.Id == quoteRequestId).FirstOrDefaultAsync();
    if (request == null)
    {
      return null;
    }

    if (request.Status == QuoteRequestStatus.Cancelled)
    {
      return null;
    }

    var quote = new Quote
    {
      QuoteRequestId = request.Id,
      ClientId = request.ClientId,
      Reference = $"Q-{DateTime.UtcNow:yyyyMMddHHmmss}",
      Subtotal = subtotal,
      TaxRate = taxRate,
      Total = subtotal + (subtotal * taxRate),
      Status = QuoteStatus.PendingApproval,
      ValidUntil = validUntil ?? DateTime.UtcNow.AddDays(30)
    };

    request.Status = QuoteRequestStatus.Quoted;
    request.UpdatedAtUtc = DateTime.UtcNow;

    await _context.Quotes.InsertOneAsync(quote);
    await _context.QuoteRequests.ReplaceOneAsync(item => item.Id == request.Id, request);

    return quote;
  }

  public async Task<Project?> ApproveQuoteAsync(string quoteId, string projectName, string projectDescription, DateTime? startDate)
  {
    var quote = await _context.Quotes.Find(item => item.Id == quoteId).FirstOrDefaultAsync();
    if (quote == null)
    {
      return null;
    }

    if (quote.Status != QuoteStatus.PendingApproval)
    {
      return null;
    }

    quote.Status = QuoteStatus.Approved;
    quote.UpdatedAtUtc = DateTime.UtcNow;

    var project = new Project
    {
      QuoteId = quote.Id,
      Reference = $"P-{DateTime.UtcNow:yyyyMMddHHmmss}",
      Name = projectName,
      Description = projectDescription,
      ClientId = quote.ClientId,
      StartDate = startDate ?? DateTime.UtcNow,
      Budget = quote.Total,
      Status = ProjectStatus.Active
    };

    await _context.Quotes.ReplaceOneAsync(item => item.Id == quote.Id, quote);
    await _context.Projects.InsertOneAsync(project);

    return project;
  }

  public async Task<Invoice?> DeliverProjectAsync(string projectId, decimal subtotal, decimal taxRate, DateTime? dueOn)
  {
    var project = await _context.Projects.Find(item => item.Id == projectId).FirstOrDefaultAsync();
    if (project == null)
    {
      return null;
    }

    if (project.Status != ProjectStatus.Active)
    {
      return null;
    }

    project.Status = ProjectStatus.OnHold;
    project.UpdatedAtUtc = DateTime.UtcNow;

    var invoice = new Invoice
    {
      Reference = $"INV-{DateTime.UtcNow:yyyyMMddHHmmss}",
      ClientId = project.ClientId,
      ProjectId = project.Id,
      Subtotal = subtotal,
      TaxRate = taxRate,
      Total = subtotal + (subtotal * taxRate),
      Status = InvoiceStatus.Sent,
      IssuedOn = DateTime.UtcNow,
      DueOn = dueOn
    };

    await _context.Projects.ReplaceOneAsync(item => item.Id == project.Id, project);
    await _context.Invoices.InsertOneAsync(invoice);

    return invoice;
  }

  public async Task<Payment?> RecordPaymentAsync(string invoiceId, decimal amount, string method)
  {
    var invoice = await _context.Invoices.Find(item => item.Id == invoiceId).FirstOrDefaultAsync();
    if (invoice == null)
    {
      return null;
    }

    if (invoice.Status == InvoiceStatus.Paid)
    {
      return null;
    }

    var payment = new Payment
    {
      InvoiceId = invoice.Id,
      ClientId = invoice.ClientId,
      Amount = amount,
      Method = method,
      Status = PaymentStatus.Paid,
      PaidOn = DateTime.UtcNow
    };

    invoice.Status = InvoiceStatus.Paid;
    invoice.UpdatedAtUtc = DateTime.UtcNow;

    await _context.Payments.InsertOneAsync(payment);
    await _context.Invoices.ReplaceOneAsync(item => item.Id == invoice.Id, invoice);

    var project = await _context.Projects.Find(item => item.Id == invoice.ProjectId).FirstOrDefaultAsync();
    if (project != null)
    {
      project.Status = ProjectStatus.Completed;
      project.EndDate = DateTime.UtcNow;
      project.UpdatedAtUtc = DateTime.UtcNow;
      await _context.Projects.ReplaceOneAsync(item => item.Id == project.Id, project);
    }

    return payment;
  }
}
