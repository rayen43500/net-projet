using Platform.Api.Entities;
using Platform.Api.Repositories;

namespace Platform.Api.Services;

public class CrudService<T> where T : BaseEntity
{
  private readonly IRepository<T> _repository;

  public CrudService(IRepository<T> repository)
  {
    _repository = repository;
  }

  public Task<List<T>> GetAllAsync()
  {
    return _repository.GetAllAsync();
  }

  public Task<T?> GetByIdAsync(string id)
  {
    return _repository.GetByIdAsync(id);
  }

  public async Task<T> CreateAsync(T entity)
  {
    entity.CreatedAtUtc = DateTime.UtcNow;
    entity.UpdatedAtUtc = DateTime.UtcNow;
    await _repository.CreateAsync(entity);
    return entity;
  }

  public async Task<bool> UpdateAsync(string id, T entity)
  {
    var existing = await _repository.GetByIdAsync(id);
    if (existing == null)
    {
      return false;
    }

    entity.Id = existing.Id;
    entity.CreatedAtUtc = existing.CreatedAtUtc;
    entity.UpdatedAtUtc = DateTime.UtcNow;
    await _repository.UpdateAsync(entity);
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
