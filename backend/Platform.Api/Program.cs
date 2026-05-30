using System.Text;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using Platform.Api.Configuration;
using Platform.Api.Data;
using Platform.Api.Entities;
using Platform.Api.Hubs;
using Platform.Api.Repositories;
using Platform.Api.Seed;
using Platform.Api.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Services.Configure<MongoDbSettings>(builder.Configuration.GetSection("MongoDb"));
builder.Services.Configure<JwtOptions>(builder.Configuration.GetSection("Jwt"));

builder.Services.AddSingleton<MongoDbContext>();
builder.Services.AddScoped<IProjectRepository, ProjectRepository>();
builder.Services.AddScoped<ProjectService>();
builder.Services.AddScoped<AuthService>();
builder.Services.AddScoped<WorkflowService>();
builder.Services.AddScoped(typeof(CrudService<>));

builder.Services.AddScoped<IRepository<Client>>(sp => new MongoRepository<Client>(sp.GetRequiredService<MongoDbContext>().Clients));
builder.Services.AddScoped<IRepository<TaskItem>>(sp => new MongoRepository<TaskItem>(sp.GetRequiredService<MongoDbContext>().Tasks));
builder.Services.AddScoped<IRepository<Ticket>>(sp => new MongoRepository<Ticket>(sp.GetRequiredService<MongoDbContext>().Tickets));
builder.Services.AddScoped<IRepository<User>>(sp => new MongoRepository<User>(sp.GetRequiredService<MongoDbContext>().Users));
builder.Services.AddScoped<IRepository<ServiceItem>>(sp => new MongoRepository<ServiceItem>(sp.GetRequiredService<MongoDbContext>().Services));
builder.Services.AddScoped<IRepository<QuoteRequest>>(sp => new MongoRepository<QuoteRequest>(sp.GetRequiredService<MongoDbContext>().QuoteRequests));
builder.Services.AddScoped<IRepository<Quote>>(sp => new MongoRepository<Quote>(sp.GetRequiredService<MongoDbContext>().Quotes));
builder.Services.AddScoped<IRepository<Invoice>>(sp => new MongoRepository<Invoice>(sp.GetRequiredService<MongoDbContext>().Invoices));
builder.Services.AddScoped<IRepository<Payment>>(sp => new MongoRepository<Payment>(sp.GetRequiredService<MongoDbContext>().Payments));
builder.Services.AddScoped<IRepository<DocumentItem>>(sp => new MongoRepository<DocumentItem>(sp.GetRequiredService<MongoDbContext>().Documents));
builder.Services.AddScoped<IRepository<BlogPost>>(sp => new MongoRepository<BlogPost>(sp.GetRequiredService<MongoDbContext>().BlogPosts));
builder.Services.AddScoped<IRepository<Promotion>>(sp => new MongoRepository<Promotion>(sp.GetRequiredService<MongoDbContext>().Promotions));
builder.Services.AddScoped<IRepository<Notification>>(sp => new MongoRepository<Notification>(sp.GetRequiredService<MongoDbContext>().Notifications));
builder.Services.AddScoped<IRepository<Team>>(sp => new MongoRepository<Team>(sp.GetRequiredService<MongoDbContext>().Teams));
builder.Services.AddScoped<IRepository<Role>>(sp => new MongoRepository<Role>(sp.GetRequiredService<MongoDbContext>().Roles));
builder.Services.AddScoped<IRepository<AuditLog>>(sp => new MongoRepository<AuditLog>(sp.GetRequiredService<MongoDbContext>().AuditLogs));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddSignalR();

var jwtOptions = builder.Configuration.GetSection("Jwt").Get<JwtOptions>() ?? new JwtOptions();
var key = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(jwtOptions.SecretKey));

builder.Services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
  .AddJwtBearer(options =>
  {
    options.TokenValidationParameters = new TokenValidationParameters
    {
      ValidateIssuer = true,
      ValidateAudience = true,
      ValidateLifetime = true,
      ValidateIssuerSigningKey = true,
      ValidIssuer = jwtOptions.Issuer,
      ValidAudience = jwtOptions.Audience,
      IssuerSigningKey = key
    };
  });

builder.Services.AddAuthorization();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
  app.UseSwagger();
  app.UseSwaggerUI();
}

app.UseAuthentication();
app.UseAuthorization();

app.MapControllers();
app.MapHub<ChatHub>("/hubs/chat");

await SeedData.EnsureSeedAsync(app.Services);

app.Run();
