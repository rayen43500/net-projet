namespace Platform.Api.Entities;

public class DocumentItem : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public string DocumentType { get; set; } = string.Empty;
  public string Url { get; set; } = string.Empty;
  public string ProjectId { get; set; } = string.Empty;
  public int Version { get; set; } = 1;
}
