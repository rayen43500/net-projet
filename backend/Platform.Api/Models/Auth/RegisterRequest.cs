namespace Platform.Api.Models.Auth;

public class RegisterRequest
{
  public string FullName { get; set; } = string.Empty;
  public string Email { get; set; } = string.Empty;
  public string Phone { get; set; } = string.Empty;
  public string Role { get; set; } = "Client";
  public string Password { get; set; } = string.Empty;
}
