namespace Platform.Api.Entities;

public class Invoice : BaseEntity
{
  public string Reference { get; set; } = string.Empty;
  public string ClientId { get; set; } = string.Empty;
  public string ProjectId { get; set; } = string.Empty;
  public decimal Subtotal { get; set; }
  public decimal TaxRate { get; set; }
  public decimal Total { get; set; }
  public string Status { get; set; } = InvoiceStatus.Draft;
  public DateTime IssuedOn { get; set; } = DateTime.UtcNow;
  public DateTime? DueOn { get; set; }
}
