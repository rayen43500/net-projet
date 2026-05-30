using Microsoft.Extensions.Options;
using MongoDB.Driver;
using Platform.Api.Configuration;
using Platform.Api.Entities;

namespace Platform.Api.Data;

public class MongoDbContext
{
  private readonly IMongoDatabase _database;

  public MongoDbContext(IOptions<MongoDbSettings> settings)
  {
    var client = new MongoClient(settings.Value.ConnectionString);
    _database = client.GetDatabase(settings.Value.Database);
  }

  public IMongoCollection<Project> Projects => _database.GetCollection<Project>("projects");
  public IMongoCollection<Client> Clients => _database.GetCollection<Client>("clients");
  public IMongoCollection<TaskItem> Tasks => _database.GetCollection<TaskItem>("tasks");
  public IMongoCollection<Ticket> Tickets => _database.GetCollection<Ticket>("tickets");
  public IMongoCollection<User> Users => _database.GetCollection<User>("users");
}
