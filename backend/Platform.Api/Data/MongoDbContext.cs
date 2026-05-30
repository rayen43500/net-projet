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
  public IMongoCollection<ServiceItem> Services => _database.GetCollection<ServiceItem>("services");
  public IMongoCollection<QuoteRequest> QuoteRequests => _database.GetCollection<QuoteRequest>("quote_requests");
  public IMongoCollection<Quote> Quotes => _database.GetCollection<Quote>("quotes");
  public IMongoCollection<Invoice> Invoices => _database.GetCollection<Invoice>("invoices");
  public IMongoCollection<Payment> Payments => _database.GetCollection<Payment>("payments");
  public IMongoCollection<DocumentItem> Documents => _database.GetCollection<DocumentItem>("documents");
  public IMongoCollection<BlogPost> BlogPosts => _database.GetCollection<BlogPost>("blog_posts");
  public IMongoCollection<Promotion> Promotions => _database.GetCollection<Promotion>("promotions");
  public IMongoCollection<Notification> Notifications => _database.GetCollection<Notification>("notifications");
  public IMongoCollection<Team> Teams => _database.GetCollection<Team>("teams");
  public IMongoCollection<Role> Roles => _database.GetCollection<Role>("roles");
  public IMongoCollection<AuditLog> AuditLogs => _database.GetCollection<AuditLog>("audit_logs");
}
