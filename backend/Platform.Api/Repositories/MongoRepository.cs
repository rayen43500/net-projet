using MongoDB.Driver;
using Platform.Api.Entities;

namespace Platform.Api.Repositories;

public class MongoRepository<T> : IRepository<T> where T : BaseEntity
{
  private readonly IMongoCollection<T> _collection;

  public MongoRepository(IMongoCollection<T> collection)
  {
    _collection = collection;
  }

  public Task<List<T>> GetAllAsync()
  {
    return _collection.Find(Builders<T>.Filter.Empty).ToListAsync();
  }

  public Task<T?> GetByIdAsync(string id)
  {
    return _collection.Find(entity => entity.Id == id).FirstOrDefaultAsync();
  }

  public Task CreateAsync(T entity)
  {
    return _collection.InsertOneAsync(entity);
  }

  public Task UpdateAsync(T entity)
  {
    return _collection.ReplaceOneAsync(item => item.Id == entity.Id, entity);
  }

  public Task DeleteAsync(string id)
  {
    return _collection.DeleteOneAsync(item => item.Id == id);
  }
}
