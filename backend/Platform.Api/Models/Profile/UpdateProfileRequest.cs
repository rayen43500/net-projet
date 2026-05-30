namespace Platform.Api.Models.Profile;

public class UpdateProfileRequest
{
  public string FullName { get; set; } = string.Empty;
  public string Phone { get; set; } = string.Empty;
  public string TeamId { get; set; } = string.Empty;
  public string AvatarUrl { get; set; } = string.Empty;
}
