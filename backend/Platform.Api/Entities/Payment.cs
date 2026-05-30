namespace Platform.Api.Entities;

public class Payment : BaseEntity
{
  public string InvoiceId { get; set; } = string.Empty;
  public string ClientId { get; set; } = string.Empty;
  public decimal Amount { get; set; }
  public string Status { get; set; } = PaymentStatus.Pending;
  public string Method { get; set; } = "Bank";
  public DateTime PaidOn { get; set; } = DateTime.UtcNow;
}
