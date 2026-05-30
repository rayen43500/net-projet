namespace Platform.Api.Entities;

public class Project : BaseEntity
{
  public string Reference { get; set; } = string.Empty;
  public string Name { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string ClientId { get; set; } = string.Empty;
  public DateTime StartDate { get; set; } = DateTime.UtcNow;
  public DateTime? EndDate { get; set; }
  public decimal Budget { get; set; }
  public string Status { get; set; } = "En attente";
}
