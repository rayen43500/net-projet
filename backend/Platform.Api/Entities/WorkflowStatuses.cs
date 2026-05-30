namespace Platform.Api.Entities;

public static class ProjectStatus
{
  public const string Draft = "Draft";
  public const string PendingApproval = "Pending Approval";
  public const string Active = "Active";
  public const string OnHold = "On Hold";
  public const string Completed = "Completed";
  public const string Cancelled = "Cancelled";
}

public static class TaskStatus
{
  public const string ToDo = "To Do";
  public const string InProgress = "In Progress";
  public const string InReview = "In Review";
  public const string Done = "Done";
}

public static class QuoteRequestStatus
{
  public const string Draft = "Draft";
  public const string Submitted = "Submitted";
  public const string Reviewed = "Reviewed";
  public const string Quoted = "Quoted";
  public const string Cancelled = "Cancelled";
}

public static class QuoteStatus
{
  public const string PendingApproval = "Pending Approval";
  public const string Approved = "Approved";
  public const string Rejected = "Rejected";
}

public static class InvoiceStatus
{
  public const string Draft = "Draft";
  public const string Sent = "Sent";
  public const string Paid = "Paid";
  public const string Overdue = "Overdue";
}

public static class PaymentStatus
{
  public const string Pending = "Pending";
  public const string Completed = "Completed";
  public const string Paid = "Paid";
  public const string Failed = "Failed";
}
