using Microsoft.Extensions.DependencyInjection;
using MongoDB.Driver;
using Platform.Api.Data;
using Platform.Api.Entities;
using Platform.Api.Security;

namespace Platform.Api.Seed;

public static class SeedData
{
  public static async Task EnsureSeedAsync(IServiceProvider services)
  {
    using var scope = services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<MongoDbContext>();

    var existingUsers = await context.Users.CountDocumentsAsync(_ => true);
    if (existingUsers > 0)
    {
      return;
    }

    var roles = new[]
    {
      new Role { Name = "Admin", Permissions = new List<string> { "*" } },
      new Role { Name = "Manager", Permissions = new List<string> { "Projects.Read", "Projects.Write", "Clients.Read" } },
      new Role { Name = "Developer", Permissions = new List<string> { "Tasks.Read", "Tasks.Write" } },
      new Role { Name = "Client", Permissions = new List<string> { "Projects.Read", "Invoices.Read" } }
    };

    await context.Roles.InsertManyAsync(roles);

    var users = CreateSeedUsers();
    await context.Users.InsertManyAsync(users);
  }

  private static List<User> CreateSeedUsers()
  {
    return new List<User>
    {
      BuildUser("admin@dsp.local", "Admin", "Admin", "Admin@123"),
      BuildUser("manager@dsp.local", "Manager", "Manager", "Manager@123"),
      BuildUser("developer@dsp.local", "Developer", "Developer", "Developer@123"),
      BuildUser("client@dsp.local", "Client", "Client", "Client@123")
    };
  }

  private static User BuildUser(string email, string fullName, string role, string password)
  {
    var salt = PasswordHasher.GenerateSalt();
    var hash = PasswordHasher.Hash(password, salt);

    return new User
    {
      Email = email,
      FullName = fullName,
      Role = role,
      PasswordSalt = salt,
      PasswordHash = hash
    };
  }
}
