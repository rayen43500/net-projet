namespace Platform.Api.Entities;

public class Team : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public List<string> MemberIds { get; set; } = new();
  public string LeadId { get; set; } = string.Empty;
}
