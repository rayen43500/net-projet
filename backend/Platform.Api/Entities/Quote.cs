namespace Platform.Api.Entities;

public class Quote : BaseEntity
{
  public string QuoteRequestId { get; set; } = string.Empty;
  public string ClientId { get; set; } = string.Empty;
  public string Reference { get; set; } = string.Empty;
  public decimal Subtotal { get; set; }
  public decimal TaxRate { get; set; }
  public decimal Total { get; set; }
  public string Status { get; set; } = QuoteStatus.PendingApproval;
  public DateTime ValidUntil { get; set; } = DateTime.UtcNow.AddDays(30);
}
