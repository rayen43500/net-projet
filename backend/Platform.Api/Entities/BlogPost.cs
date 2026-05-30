namespace Platform.Api.Entities;

public class BlogPost : BaseEntity
{
  public string Title { get; set; } = string.Empty;
  public string Slug { get; set; } = string.Empty;
  public string Content { get; set; } = string.Empty;
  public string Category { get; set; } = string.Empty;
  public bool IsPublished { get; set; }
}
