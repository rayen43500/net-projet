namespace Platform.Api.Entities;

public class AuditLog : BaseEntity
{
  public string ActorId { get; set; } = string.Empty;
  public string Action { get; set; } = string.Empty;
  public string EntityName { get; set; } = string.Empty;
  public string EntityId { get; set; } = string.Empty;
  public string Details { get; set; } = string.Empty;
}
