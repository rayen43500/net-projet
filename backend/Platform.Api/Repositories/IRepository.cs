using Platform.Api.Entities;

namespace Platform.Api.Repositories;

public interface IRepository<T> where T : BaseEntity
{
  Task<List<T>> GetAllAsync();
  Task<T?> GetByIdAsync(string id);
  Task CreateAsync(T entity);
  Task UpdateAsync(T entity);
  Task DeleteAsync(string id);
}
