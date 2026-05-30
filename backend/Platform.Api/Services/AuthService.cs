using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using MongoDB.Driver;
using Platform.Api.Configuration;
using Platform.Api.Data;
using Platform.Api.Entities;
using Platform.Api.Security;

namespace Platform.Api.Services;

public class AuthService
{
  private readonly JwtOptions _options;
  private readonly MongoDbContext _context;

  public AuthService(IOptions<JwtOptions> options, MongoDbContext context)
  {
    _options = options.Value;
    _context = context;
  }

  public async Task<(bool Success, string Token, DateTime ExpiresAtUtc, string Role, string UserId)> AuthenticateAsync(string email, string password)
  {
    var user = await _context.Users.Find(item => item.Email == email).FirstOrDefaultAsync();
    if (user == null)
    {
      return (false, string.Empty, DateTime.UtcNow, string.Empty, string.Empty);
    }

    if (!PasswordHasher.Verify(password, user.PasswordSalt, user.PasswordHash))
    {
      return (false, string.Empty, DateTime.UtcNow, string.Empty, string.Empty);
    }

    var (token, expiresAtUtc) = GenerateToken(user.Email, user.Role, user.Id);
    return (true, token, expiresAtUtc, user.Role, user.Id);
  }

  public async Task<(bool Success, string Error, string Token, DateTime ExpiresAtUtc, string Role, string UserId)> RegisterAsync(
    string fullName,
    string email,
    string phone,
    string role,
    string password
  )
  {
    var existing = await _context.Users.Find(item => item.Email == email).FirstOrDefaultAsync();
    if (existing != null)
    {
      return (false, "Email already exists", string.Empty, DateTime.UtcNow, string.Empty, string.Empty);
    }

    var normalizedRole = NormalizeRole(role);
    var salt = PasswordHasher.GenerateSalt();
    var hash = PasswordHasher.Hash(password, salt);

    var user = new User
    {
      Email = email,
      FullName = fullName,
      Phone = phone,
      Role = normalizedRole,
      PasswordSalt = salt,
      PasswordHash = hash
    };

    await _context.Users.InsertOneAsync(user);

    var (token, expiresAtUtc) = GenerateToken(user.Email, user.Role, user.Id);
    return (true, string.Empty, token, expiresAtUtc, user.Role, user.Id);
  }

  private (string Token, DateTime ExpiresAtUtc) GenerateToken(string email, string role, string userId)
  {
    var claims = new List<Claim>
    {
      new Claim(ClaimTypes.Email, email),
      new Claim(ClaimTypes.Role, role),
      new Claim(ClaimTypes.NameIdentifier, userId)
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

  private static string NormalizeRole(string role)
  {
    var value = role.Trim();
    return value switch
    {
      "Admin" => "Admin",
      "Manager" => "Manager",
      "Developer" => "Developer",
      "Client" => "Client",
      _ => "Client"
    };
  }
}
