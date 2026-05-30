namespace Platform.Api.Models.Workflow;

public class CreateQuoteFromRequestRequest
{
  public decimal Subtotal { get; set; }
  public decimal TaxRate { get; set; }
  public DateTime? ValidUntil { get; set; }
}
