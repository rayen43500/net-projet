namespace Platform.Api.Entities;

public class Client : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public string ContactName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Phone { get; set; } = string.Empty;
}
