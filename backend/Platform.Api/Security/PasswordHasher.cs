using System.Security.Cryptography;
using System.Text;

namespace Platform.Api.Security;

public static class PasswordHasher
{
  public static string GenerateSalt()
  {
    var buffer = RandomNumberGenerator.GetBytes(16);
    return Convert.ToBase64String(buffer);
  }

  public static string Hash(string password, string salt)
  {
    using var sha = SHA256.Create();
    var bytes = Encoding.UTF8.GetBytes(password + salt);
    var hash = sha.ComputeHash(bytes);
    return Convert.ToBase64String(hash);
  }

  public static bool Verify(string password, string salt, string hash)
  {
    var computed = Hash(password, salt);
    return computed == hash;
  }
}
