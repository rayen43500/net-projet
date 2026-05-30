namespace Platform.Api.Models.Workflow;

public class DeliverProjectRequest
{
  public decimal Subtotal { get; set; }
  public decimal TaxRate { get; set; }
  public DateTime? DueOn { get; set; }
}
