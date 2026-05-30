namespace Platform.Api.Models.Workflow;

public class ApproveQuoteRequest
{
  public string ProjectName { get; set; } = string.Empty;
  public string ProjectDescription { get; set; } = string.Empty;
  public DateTime? StartDate { get; set; }
}
