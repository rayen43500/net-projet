using MongoDB.Driver;
using Platform.Api.Data;
using Platform.Api.Entities;

namespace Platform.Api.Repositories;

public class ProjectRepository : MongoRepository<Project>, IProjectRepository
{
  private readonly IMongoCollection<Project> _projects;

  public ProjectRepository(MongoDbContext context) : base(context.Projects)
  {
    _projects = context.Projects;
  }

  public Task<List<Project>> GetByClientIdAsync(string clientId)
  {
    return _projects.Find(project => project.ClientId == clientId).ToListAsync();
  }
}
