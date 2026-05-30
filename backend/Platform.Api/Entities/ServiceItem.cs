namespace Platform.Api.Entities;

public class ServiceItem : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public decimal EstimatedPrice { get; set; }
  public int EstimatedDays { get; set; }
  public string Category { get; set; } = string.Empty;
  public List<string> ImageUrls { get; set; } = new();
}
