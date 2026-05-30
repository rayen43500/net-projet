namespace Platform.Api.Entities;

public class QuoteRequest : BaseEntity
{
  public string ClientId { get; set; } = string.Empty;
  public string CompanyName { get; set; } = string.Empty;
  public string ContactName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Phone { get; set; } = string.Empty;
  public string ProjectType { get; set; } = string.Empty;
  public decimal? Budget { get; set; }
  public string Description { get; set; } = string.Empty;
  public List<string> AttachmentUrls { get; set; } = new();
  public string Status { get; set; } = QuoteRequestStatus.Draft;
}
