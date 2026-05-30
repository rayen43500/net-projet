using Platform.Api.Entities;
using Platform.Api.Repositories;

namespace Platform.Api.Services;

public class ProjectService
{
  private readonly IProjectRepository _repository;

  public ProjectService(IProjectRepository repository)
  {
    _repository = repository;
  }

  public Task<List<Project>> GetAllAsync()
  {
    return _repository.GetAllAsync();
  }

  public Task<Project?> GetByIdAsync(string id)
  {
    return _repository.GetByIdAsync(id);
  }

  public Task<List<Project>> GetByClientIdAsync(string clientId)
  {
    return _repository.GetByClientIdAsync(clientId);
  }

  public async Task<Project> CreateAsync(Project project)
  {
    project.CreatedAtUtc = DateTime.UtcNow;
    project.UpdatedAtUtc = DateTime.UtcNow;
    await _repository.CreateAsync(project);
    return project;
  }

  public async Task<bool> UpdateAsync(string id, Project project)
  {
    var existing = await _repository.GetByIdAsync(id);
    if (existing == null)
    {
      return false;
    }

    project.Id = existing.Id;
    project.CreatedAtUtc = existing.CreatedAtUtc;
    project.UpdatedAtUtc = DateTime.UtcNow;
    await _repository.UpdateAsync(project);
    return true;
  }

  public async Task<bool> DeleteAsync(string id)
  {
    var existing = await _repository.GetByIdAsync(id);
    if (existing == null)
    {
      return false;
    }

    await _repository.DeleteAsync(id);
    return true;
  }
}
