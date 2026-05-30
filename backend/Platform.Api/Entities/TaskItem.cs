namespace Platform.Api.Entities;

public class TaskItem : BaseEntity
{
  public string ProjectId { get; set; } = string.Empty;
  public string Title { get; set; } = string.Empty;
  public string Description { get; set; } = string.Empty;
  public string AssigneeId { get; set; } = string.Empty;
  public string Priority { get; set; } = "Medium";
  public DateTime? DueDate { get; set; }
  public string Status { get; set; } = TaskStatus.ToDo;
  public int Progress { get; set; }
}
