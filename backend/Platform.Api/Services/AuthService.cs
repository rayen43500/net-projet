using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using Platform.Api.Configuration;

namespace Platform.Api.Services;

public class AuthService
{
  private readonly JwtOptions _options;

  public AuthService(IOptions<JwtOptions> options)
  {
    _options = options.Value;
  }

  public (string Token, DateTime ExpiresAtUtc) GenerateToken(string email, string role)
  {
    var claims = new List<Claim>
    {
      new Claim(ClaimTypes.Email, email),
      new Claim(ClaimTypes.Role, role)
    };

    var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(_options.SecretKey));
    var creds = new SigningCredentials(key, SecurityAlgorithms.HmacSha256);
    var expires = DateTime.UtcNow.AddMinutes(_options.ExpiresMinutes);

    var token = new JwtSecurityToken(
      issuer: _options.Issuer,
      audience: _options.Audience,
      claims: claims,
      expires: expires,
      signingCredentials: creds
    );

    return (new JwtSecurityTokenHandler().WriteToken(token), expires);
  }
}
