using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace Platform.Api.Entities;

public abstract class BaseEntity
{
  [BsonId]
  [BsonRepresentation(BsonType.ObjectId)]
  public string Id { get; set; } = string.Empty;

  public DateTime CreatedAtUtc { get; set; } = DateTime.UtcNow;
  public DateTime UpdatedAtUtc { get; set; } = DateTime.UtcNow;
}
