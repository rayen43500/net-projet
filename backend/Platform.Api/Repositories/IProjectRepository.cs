using Platform.Api.Entities;

namespace Platform.Api.Repositories;

public interface IProjectRepository : IRepository<Project>
{
  Task<List<Project>> GetByClientIdAsync(string clientId);
}
