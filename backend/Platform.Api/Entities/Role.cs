namespace Platform.Api.Entities;

public class Role : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public List<string> Permissions { get; set; } = new();
}
