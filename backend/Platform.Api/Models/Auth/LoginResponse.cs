namespace Platform.Api.Models.Auth;

public class LoginResponse
{
  public string Token { get; set; } = string.Empty;
  public DateTime ExpiresAtUtc { get; set; }
  public string Role { get; set; } = string.Empty;
  public string UserId { get; set; } = string.Empty;
}
