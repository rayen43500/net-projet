namespace Platform.Api.Entities;

public class Promotion : BaseEntity
{
  public string Name { get; set; } = string.Empty;
  public string Code { get; set; } = string.Empty;
  public decimal DiscountPercent { get; set; }
  public DateTime StartsOn { get; set; } = DateTime.UtcNow;
  public DateTime? EndsOn { get; set; }
  public bool IsActive { get; set; } = true;
}
