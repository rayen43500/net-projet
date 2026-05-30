namespace Platform.Api.Models.Workflow;

public class RecordPaymentRequest
{
  public decimal Amount { get; set; }
  public string Method { get; set; } = "Bank";
}
