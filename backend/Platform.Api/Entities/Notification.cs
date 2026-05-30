namespace Platform.Api.Entities;

public class Notification : BaseEntity
{
  public string Title { get; set; } = string.Empty;
  public string Message { get; set; } = string.Empty;
  public string RecipientId { get; set; } = string.Empty;
  public bool IsRead { get; set; }
  public string Channel { get; set; } = "System";
}
