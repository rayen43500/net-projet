namespace Platform.Api.Entities;

public class Ticket : BaseEntity
{
  public string Subject { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string Priority { get; set; } = "Normal";
  public string Status { get; set; } = "Ouvert";
  public string ClientId { get; set; } = string.Empty;
  public string ProjectId { get; set; } = string.Empty;
}
