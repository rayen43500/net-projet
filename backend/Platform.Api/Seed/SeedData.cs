using MongoDB.Bson;
using MongoDB.Driver;
using Platform.Api.Data;
using Platform.Api.Entities;
using Platform.Api.Security;
using TS = Platform.Api.Entities.TaskStatus;

namespace Platform.Api.Seed;

public static class SeedData
{
  public static async Task EnsureSeedAsync(IServiceProvider services)
  {
    using var scope = services.CreateScope();
    var context = scope.ServiceProvider.GetRequiredService<MongoDbContext>();

    var existingUsers = await context.Users.CountDocumentsAsync(_ => true);
    if (existingUsers > 0) return;

    // ── Pre-generate IDs so every FK is consistent ──────────────────────────
    var adminId     = ObjectId.GenerateNewId().ToString();
    var managerId   = ObjectId.GenerateNewId().ToString();
    var dev1Id      = ObjectId.GenerateNewId().ToString();
    var dev2Id      = ObjectId.GenerateNewId().ToString();
    var client1Id   = ObjectId.GenerateNewId().ToString();
    var client2Id   = ObjectId.GenerateNewId().ToString();
    var client3Id   = ObjectId.GenerateNewId().ToString();

    var teamAlphaId = ObjectId.GenerateNewId().ToString();
    var teamBetaId  = ObjectId.GenerateNewId().ToString();

    var cli1Id = ObjectId.GenerateNewId().ToString();
    var cli2Id = ObjectId.GenerateNewId().ToString();
    var cli3Id = ObjectId.GenerateNewId().ToString();

    var qr1Id = ObjectId.GenerateNewId().ToString();
    var qr2Id = ObjectId.GenerateNewId().ToString();
    var qr3Id = ObjectId.GenerateNewId().ToString();

    var q1Id = ObjectId.GenerateNewId().ToString();
    var q2Id = ObjectId.GenerateNewId().ToString();
    var q3Id = ObjectId.GenerateNewId().ToString();

    var proj1Id = ObjectId.GenerateNewId().ToString();
    var proj2Id = ObjectId.GenerateNewId().ToString();
    var proj3Id = ObjectId.GenerateNewId().ToString();

    var inv1Id = ObjectId.GenerateNewId().ToString();
    var inv2Id = ObjectId.GenerateNewId().ToString();
    var inv3Id = ObjectId.GenerateNewId().ToString();

    // ── Roles ────────────────────────────────────────────────────────────────
    await context.Roles.InsertManyAsync(new[]
    {
      new Role { Name = "Admin",     Permissions = new List<string> { "*" } },
      new Role { Name = "Manager",   Permissions = new List<string> { "Projects.Read","Projects.Write","Clients.Read","Quotes.Write","Invoices.Write" } },
      new Role { Name = "Developer", Permissions = new List<string> { "Tasks.Read","Tasks.Write","Documents.Read" } },
      new Role { Name = "Client",    Permissions = new List<string> { "Projects.Read","Invoices.Read","Payments.Read","Tickets.Write" } }
    });

    // ── Users ────────────────────────────────────────────────────────────────
    await context.Users.InsertManyAsync(new[]
    {
      BuildUser(adminId,   "admin@dsp.local",   "Alexandre Martin",    "Admin",     "Admin@123",     teamAlphaId, "+33 1 40 00 01 00"),
      BuildUser(managerId, "manager@dsp.local", "Sophie Leclerc",      "Manager",   "Manager@123",   teamAlphaId, "+33 1 40 00 02 00"),
      BuildUser(dev1Id,    "dev1@dsp.local",    "Lucas Dupont",        "Developer", "Developer@123", teamAlphaId, "+33 6 12 34 56 78"),
      BuildUser(dev2Id,    "dev2@dsp.local",    "Inès Moreau",         "Developer", "Developer@123", teamBetaId,  "+33 6 98 76 54 32"),
      BuildUser(client1Id, "client1@dsp.local", "Marc Rousseau",       "Client",    "Client@123",    "",          "+33 6 11 22 33 44"),
      BuildUser(client2Id, "client2@dsp.local", "Julie Bernard",       "Client",    "Client@123",    "",          "+33 6 55 66 77 88"),
      BuildUser(client3Id, "client3@dsp.local", "Thomas Petit",        "Client",    "Client@123",    "",          "+33 6 99 00 11 22")
    });

    // ── Teams ────────────────────────────────────────────────────────────────
    await context.Teams.InsertManyAsync(new[]
    {
      new Team { Id = teamAlphaId, Name = "Equipe Alpha", LeadId = managerId,  MemberIds = new List<string> { managerId, dev1Id, adminId } },
      new Team { Id = teamBetaId,  Name = "Equipe Beta",  LeadId = dev1Id,     MemberIds = new List<string> { dev2Id } }
    });

    // ── Clients ──────────────────────────────────────────────────────────────
    await context.Clients.InsertManyAsync(new[]
    {
      new Client { Id = cli1Id, Name = "TechVision SARL",    ContactName = "Marc Rousseau", Email = "contact@techvision.fr",  Phone = "+33 1 50 00 10 00" },
      new Client { Id = cli2Id, Name = "NovaBuild SAS",      ContactName = "Julie Bernard", Email = "info@novabuild.fr",       Phone = "+33 1 60 00 20 00" },
      new Client { Id = cli3Id, Name = "DigiRetail Group",   ContactName = "Thomas Petit",  Email = "thomas@digiretail.com",   Phone = "+33 1 70 00 30 00" }
    });

    // ── Services ─────────────────────────────────────────────────────────────
    await context.Services.InsertManyAsync(new[]
    {
      new ServiceItem { Name = "Développement Site Vitrine Premium",  Description = "Site responsive multi-pages avec SEO technique, CMS et analytics.",        EstimatedPrice = 2500,  EstimatedDays = 21, Category = "Web",     ImageUrls = new List<string> { "https://images.unsplash.com/photo-1547082299-de196ea013d6?w=600" } },
      new ServiceItem { Name = "Application Mobile iOS & Android",    Description = "App native ou Flutter avec backend API REST et notifications push.",        EstimatedPrice = 6000,  EstimatedDays = 60, Category = "Mobile",  ImageUrls = new List<string> { "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600" } },
      new ServiceItem { Name = "Dashboard ERP sur mesure",            Description = "Tableau de bord personnalisé avec rôles, KPIs et exports CSV/PDF.",         EstimatedPrice = 4500,  EstimatedDays = 45, Category = "Web",     ImageUrls = new List<string> { "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" } },
      new ServiceItem { Name = "Migration Cloud AWS/Azure",           Description = "Audit, planification et migration sécurisée vers cloud avec monitoring.",   EstimatedPrice = 3200,  EstimatedDays = 30, Category = "DevOps",  ImageUrls = new List<string> { "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600" } },
      new ServiceItem { Name = "Audit de Sécurité & Pentest",         Description = "Analyse des vulnérabilités, rapport OWASP et recommandations correctives.", EstimatedPrice = 1800,  EstimatedDays = 10, Category = "Sécurité",ImageUrls = new List<string> { "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=600" } },
      new ServiceItem { Name = "Intégration IA & Chatbot",            Description = "Intégration LLM (OpenAI/Gemini), chatbot métier et automatisation.",        EstimatedPrice = 3800,  EstimatedDays = 25, Category = "IA",      ImageUrls = new List<string> { "https://images.unsplash.com/photo-1677442136019-21780efad99a?w=600" } },
      new ServiceItem { Name = "Design UI/UX Complet",                Description = "Audit UX, wireframes, prototype Figma et kit de composants.",               EstimatedPrice = 2200,  EstimatedDays = 20, Category = "Design",  ImageUrls = new List<string> { "https://images.unsplash.com/photo-1561070791-26c113006238?w=600" } },
      new ServiceItem { Name = "Maintenance & SLA 24/7",              Description = "Contrat de maintenance mensuel, mises à jour, monitoring et support.",       EstimatedPrice = 800,   EstimatedDays = 30, Category = "Support", ImageUrls = new List<string> { "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=600" } }
    });

    // ── Quote Requests ───────────────────────────────────────────────────────
    await context.QuoteRequests.InsertManyAsync(new[]
    {
      new QuoteRequest { Id = qr1Id, ClientId = cli1Id, CompanyName = "TechVision SARL",  ContactName = "Marc Rousseau", Email = "marc@techvision.fr",  Phone = "+33 6 11 22 33 44", ProjectType = "Site Web E-commerce",    Budget = 3000,  Description = "Refonte complète du site avec intégration Stripe et gestion des stocks.", Status = QuoteRequestStatus.Submitted },
      new QuoteRequest { Id = qr2Id, ClientId = cli2Id, CompanyName = "NovaBuild SAS",    ContactName = "Julie Bernard", Email = "julie@novabuild.fr",   Phone = "+33 6 55 66 77 88", ProjectType = "Application Mobile",     Budget = 8000,  Description = "Application de gestion chantier pour iOS et Android avec photos et GPS.", Status = QuoteRequestStatus.Reviewed },
      new QuoteRequest { Id = qr3Id, ClientId = cli3Id, CompanyName = "DigiRetail Group", ContactName = "Thomas Petit",  Email = "thomas@digiretail.com",Phone = "+33 6 99 00 11 22", ProjectType = "Dashboard Analytics",    Budget = 5000,  Description = "Dashboard temps réel avec données POS, KPIs et export automatique PDF.", Status = QuoteRequestStatus.Draft }
    });

    // ── Quotes ───────────────────────────────────────────────────────────────
    await context.Quotes.InsertManyAsync(new[]
    {
      new Quote { Id = q1Id, QuoteRequestId = qr1Id, ClientId = cli1Id, Reference = "DEV-2024-001", Subtotal = 2500, TaxRate = 20, Total = 3000,  Status = QuoteStatus.Approved,        ValidUntil = DateTime.UtcNow.AddDays(15) },
      new Quote { Id = q2Id, QuoteRequestId = qr2Id, ClientId = cli2Id, Reference = "DEV-2024-002", Subtotal = 6000, TaxRate = 20, Total = 7200,  Status = QuoteStatus.PendingApproval, ValidUntil = DateTime.UtcNow.AddDays(30) },
      new Quote { Id = q3Id, QuoteRequestId = qr3Id, ClientId = cli3Id, Reference = "DEV-2024-003", Subtotal = 4500, TaxRate = 20, Total = 5400,  Status = QuoteStatus.PendingApproval, ValidUntil = DateTime.UtcNow.AddDays(45) }
    });

    // ── Projects ─────────────────────────────────────────────────────────────
    await context.Projects.InsertManyAsync(new[]
    {
      new Project { Id = proj1Id, Reference = "PRJ-2024-001", Name = "Site E-commerce TechVision",    Description = "Refonte du site avec Stripe, gestion stocks et SEO.",       ClientId = cli1Id, QuoteId = q1Id, Status = ProjectStatus.Active,     Budget = 3000,  StartDate = DateTime.UtcNow.AddDays(-30), EndDate = DateTime.UtcNow.AddDays(21)  },
      new Project { Id = proj2Id, Reference = "PRJ-2024-002", Name = "App Mobile NovaBuild",          Description = "Application chantier iOS/Android avec GPS et photos.",       ClientId = cli2Id, QuoteId = q2Id, Status = ProjectStatus.Active,     Budget = 7200,  StartDate = DateTime.UtcNow.AddDays(-10), EndDate = DateTime.UtcNow.AddDays(60)  },
      new Project { Id = proj3Id, Reference = "PRJ-2024-003", Name = "Dashboard DigiRetail Analytics",Description = "Tableau de bord temps réel avec export PDF automatique.",    ClientId = cli3Id, QuoteId = q3Id, Status = ProjectStatus.Draft,     Budget = 5400,  StartDate = DateTime.UtcNow.AddDays(5),   EndDate = DateTime.UtcNow.AddDays(50)  }
    });

    // ── Tasks ────────────────────────────────────────────────────────────────
    await context.Tasks.InsertManyAsync(new[]
    {
      new TaskItem { ProjectId = proj1Id, Title = "Maquettes Figma Homepage",       Description = "Créer wireframes et prototype haute fidélité pour la homepage.",         AssigneeId = dev1Id, Priority = "High",   Status = TS.Done,       Progress = 100, DueDate = DateTime.UtcNow.AddDays(-20) },
      new TaskItem { ProjectId = proj1Id, Title = "Intégration Stripe Paiement",    Description = "Implémenter le tunnel de paiement Stripe avec webhook de confirmation.",  AssigneeId = dev1Id, Priority = "High",   Status = TS.InProgress, Progress = 65,  DueDate = DateTime.UtcNow.AddDays(5)  },
      new TaskItem { ProjectId = proj1Id, Title = "Module Gestion des Stocks",      Description = "CRUD produits, catégories, alertes stock bas et dashboard inventaire.",   AssigneeId = dev2Id, Priority = "Medium", Status = TS.InProgress, Progress = 40,  DueDate = DateTime.UtcNow.AddDays(12) },
      new TaskItem { ProjectId = proj1Id, Title = "Optimisation SEO Technique",     Description = "Meta tags, sitemap XML, schema.org et optimisation Core Web Vitals.",     AssigneeId = dev2Id, Priority = "Low",    Status = TS.ToDo,       Progress = 0,   DueDate = DateTime.UtcNow.AddDays(18) },
      new TaskItem { ProjectId = proj2Id, Title = "Architecture API REST",           Description = "Concevoir et documenter l'API REST avec Swagger et tests unitaires.",     AssigneeId = dev1Id, Priority = "High",   Status = TS.Done,       Progress = 100, DueDate = DateTime.UtcNow.AddDays(-5)  },
      new TaskItem { ProjectId = proj2Id, Title = "Module Géolocalisation GPS",      Description = "Intégrer Google Maps SDK, enregistrement positions et alertes zones.",   AssigneeId = dev2Id, Priority = "High",   Status = TS.InProgress, Progress = 55,  DueDate = DateTime.UtcNow.AddDays(15) },
      new TaskItem { ProjectId = proj2Id, Title = "Notifications Push Firebase",     Description = "Setup Firebase Cloud Messaging pour alertes temps réel chantier.",        AssigneeId = dev1Id, Priority = "Medium", Status = TS.InReview,   Progress = 90,  DueDate = DateTime.UtcNow.AddDays(8)  },
      new TaskItem { ProjectId = proj3Id, Title = "Connexion Base Données POS",     Description = "Connecteur SQL vers système de caisse avec synchronisation toutes les heures.", AssigneeId = dev1Id, Priority = "High",   Status = TS.ToDo,   Progress = 0,   DueDate = DateTime.UtcNow.AddDays(20) },
      new TaskItem { ProjectId = proj3Id, Title = "Graphiques KPIs Temps Réel",     Description = "Charts Chart.js avec WebSocket pour mise à jour live des indicateurs.",   AssigneeId = dev2Id, Priority = "Medium", Status = TS.ToDo,       Progress = 0,   DueDate = DateTime.UtcNow.AddDays(30) }
    });

    // ── Invoices ─────────────────────────────────────────────────────────────
    await context.Invoices.InsertManyAsync(new[]
    {
      new Invoice { Id = inv1Id, Reference = "FAC-2024-001", ClientId = cli1Id, ProjectId = proj1Id, Subtotal = 1250, TaxRate = 20, Total = 1500, Status = InvoiceStatus.Paid,    IssuedOn = DateTime.UtcNow.AddDays(-25), DueOn = DateTime.UtcNow.AddDays(-10) },
      new Invoice { Id = inv2Id, Reference = "FAC-2024-002", ClientId = cli1Id, ProjectId = proj1Id, Subtotal = 1250, TaxRate = 20, Total = 1500, Status = InvoiceStatus.Sent,    IssuedOn = DateTime.UtcNow.AddDays(-5),  DueOn = DateTime.UtcNow.AddDays(10)  },
      new Invoice { Id = inv3Id, Reference = "FAC-2024-003", ClientId = cli2Id, ProjectId = proj2Id, Subtotal = 3600, TaxRate = 20, Total = 4320, Status = InvoiceStatus.Draft,   IssuedOn = DateTime.UtcNow,              DueOn = DateTime.UtcNow.AddDays(30)  }
    });

    // ── Payments ─────────────────────────────────────────────────────────────
    await context.Payments.InsertManyAsync(new[]
    {
      new Payment { InvoiceId = inv1Id, ClientId = cli1Id, Amount = 1500, Status = PaymentStatus.Completed, Method = "Bank",  PaidOn = DateTime.UtcNow.AddDays(-10) },
      new Payment { InvoiceId = inv2Id, ClientId = cli1Id, Amount = 750,  Status = PaymentStatus.Pending,   Method = "Card",  PaidOn = DateTime.UtcNow              },
      new Payment { InvoiceId = inv3Id, ClientId = cli2Id, Amount = 4320, Status = PaymentStatus.Pending,   Method = "Bank",  PaidOn = DateTime.UtcNow.AddDays(5)   }
    });

    // ── Documents ────────────────────────────────────────────────────────────
    await context.Documents.InsertManyAsync(new[]
    {
      new DocumentItem { ProjectId = proj1Id, Name = "Cahier des charges - TechVision",  DocumentType = "Specification", Version = 1, Url = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600" },
      new DocumentItem { ProjectId = proj1Id, Name = "Maquettes Figma v2",               DocumentType = "Design",        Version = 2, Url = "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=600" },
      new DocumentItem { ProjectId = proj1Id, Name = "Rapport Recette - Sprint 1",        DocumentType = "Rapport",       Version = 1, Url = "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=600" },
      new DocumentItem { ProjectId = proj2Id, Name = "Architecture Technique App Mobile", DocumentType = "Specification", Version = 1, Url = "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=600" },
      new DocumentItem { ProjectId = proj2Id, Name = "Contrat de Prestation NovaBuild",   DocumentType = "Contrat",       Version = 1, Url = "https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600" },
      new DocumentItem { ProjectId = proj3Id, Name = "Brief Analytics DigiRetail",        DocumentType = "Specification", Version = 1, Url = "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600" }
    });

    // ── Tickets ──────────────────────────────────────────────────────────────
    await context.Tickets.InsertManyAsync(new[]
    {
      new Ticket { ClientId = cli1Id, ProjectId = proj1Id, Subject = "Page panier se vide lors du rechargement",     Description = "Sur mobile Safari, le panier est réinitialisé à chaque rechargement de page.", Priority = "High",   Status = "En cours" },
      new Ticket { ClientId = cli1Id, ProjectId = proj1Id, Subject = "Email de confirmation non reçu après achat",   Description = "Les clients ne reçoivent pas l'email de confirmation après paiement Stripe.",    Priority = "Urgent", Status = "Ouvert"  },
      new Ticket { ClientId = cli2Id, ProjectId = proj2Id, Subject = "Crash au démarrage sur Android 12",            Description = "L'application plante immédiatement sur les appareils Android 12 Pixel.",         Priority = "Urgent", Status = "Ouvert"  },
      new Ticket { ClientId = cli2Id, ProjectId = proj2Id, Subject = "Précision GPS insuffisante en zone dense",     Description = "En milieu urbain, la localisation dérive de 50+ mètres par rapport au réel.",     Priority = "Normal", Status = "Ouvert"  },
      new Ticket { ClientId = cli3Id, ProjectId = proj3Id, Subject = "Graphiques ne se mettent pas à jour en live",  Description = "Les graphiques KPI restent figés, le rechargement manuel est nécessaire.",        Priority = "High",   Status = "Ouvert"  }
    });

    // ── Blog Posts ───────────────────────────────────────────────────────────
    await context.BlogPosts.InsertManyAsync(new[]
    {
      new BlogPost { Title = "Pourquoi choisir une architecture microservices en 2024 ?",          Slug = "microservices-2024",        Category = "Architecture", IsPublished = true,  Content = "Les microservices permettent une scalabilité indépendante de chaque composant métier. Découvrez pourquoi cette approche est devenue le standard pour les applications à fort trafic. Nous analyserons les avantages, les inconvénients et les patterns essentiels à maîtriser..." },
      new BlogPost { Title = "Guide complet : Intégrer l'IA dans votre application métier",         Slug = "ia-application-metier",     Category = "IA & Tech",    IsPublished = true,  Content = "L'intelligence artificielle n'est plus réservée aux géants technologiques. Des APIs comme OpenAI et Gemini permettent aujourd'hui d'ajouter des fonctionnalités intelligentes en quelques lignes de code. Voici notre guide pratique pas à pas..." },
      new BlogPost { Title = "Top 10 des bonnes pratiques DevOps pour des déploiements sans risque", Slug = "devops-best-practices",     Category = "DevOps",       IsPublished = true,  Content = "Le DevOps n'est pas une technologie mais une culture. Pipelines CI/CD, conteneurisation Docker, monitoring proactif et rollback automatique sont les piliers d'une livraison sereine. Découvrez les 10 pratiques adoptées par nos équipes..." },
      new BlogPost { Title = "Comment optimiser les performances d'une API .NET 8 avec MongoDB",    Slug = "dotnet8-mongodb-perf",      Category = "Backend",      IsPublished = true,  Content = "MongoDB et .NET 8 forment un duo redoutable pour les API haute performance. Index composites, projections, bulk operations et connection pooling : voici toutes les optimisations que nous appliquons systématiquement sur nos projets..." },
      new BlogPost { Title = "React + SignalR : Chat temps réel multi-utilisateur en 30 minutes",  Slug = "react-signalr-chat",        Category = "Frontend",     IsPublished = true,  Content = "SignalR abstrait parfaitement la complexité des WebSockets. Dans ce tutoriel pratique, nous construisons un chat multi-canal complet avec authentification JWT, rooms dynamiques et indicateurs de présence en temps réel..." },
      new BlogPost { Title = "Sécurité API : JWT, CORS et Rate Limiting expliqués simplement",      Slug = "securite-api-jwt-cors",     Category = "Sécurité",     IsPublished = false, Content = "Article en cours de rédaction - publication prévue la semaine prochaine." }
    });

    // ── Promotions ───────────────────────────────────────────────────────────
    await context.Promotions.InsertManyAsync(new[]
    {
      new Promotion { Name = "Offre Lancement Été 2024",     Code = "ETE2024",   DiscountPercent = 15, StartsOn = DateTime.UtcNow.AddDays(-10), EndsOn = DateTime.UtcNow.AddDays(20),  IsActive = true  },
      new Promotion { Name = "Pack Fidélité Client VIP",     Code = "FIDVIP",    DiscountPercent = 20, StartsOn = DateTime.UtcNow.AddDays(-30), EndsOn = DateTime.UtcNow.AddDays(60),  IsActive = true  },
      new Promotion { Name = "Promo Rentrée Développement",  Code = "RENTREE24", DiscountPercent = 10, StartsOn = DateTime.UtcNow.AddDays(5),   EndsOn = DateTime.UtcNow.AddDays(35),  IsActive = false },
      new Promotion { Name = "Black Friday Tech Services",   Code = "BLACKFRI",  DiscountPercent = 25, StartsOn = DateTime.UtcNow.AddDays(90),  EndsOn = DateTime.UtcNow.AddDays(94),  IsActive = false }
    });

    // ── Notifications ────────────────────────────────────────────────────────
    await context.Notifications.InsertManyAsync(new[]
    {
      new Notification { RecipientId = client1Id, Title = "Votre devis DEV-2024-001 a été approuvé !",  Message = "Félicitations ! Votre devis a été accepté. Le projet Site E-commerce TechVision démarre officiellement.",    Channel = "System", IsRead = false },
      new Notification { RecipientId = client1Id, Title = "Facture FAC-2024-002 en attente de paiement", Message = "Votre facture de 1 500 € est disponible. Merci de procéder au règlement avant le 10 juin 2024.",          Channel = "Email",  IsRead = false },
      new Notification { RecipientId = client2Id, Title = "Ticket #3 : Crash Android pris en charge",    Message = "Notre équipe technique a pris en charge votre signalement. Une correction est en cours de développement.", Channel = "System", IsRead = true  },
      new Notification { RecipientId = dev1Id,    Title = "Nouvelle tâche assignée : Notifications Push", Message = "La tâche 'Notifications Push Firebase' vous a été assignée sur le projet App Mobile NovaBuild.",         Channel = "System", IsRead = false },
      new Notification { RecipientId = managerId, Title = "Demande de devis en attente de traitement",    Message = "DigiRetail Group a soumis une nouvelle demande de devis pour un Dashboard Analytics. Action requise.",    Channel = "System", IsRead = false },
      new Notification { RecipientId = adminId,   Title = "Rapport mensuel disponible",                   Message = "Le rapport d'activité du mois de mai 2024 est prêt. 3 projets actifs, 6 factures émises, 9 tâches.",    Channel = "Email",  IsRead = true  }
    });
  }

  private static User BuildUser(string id, string email, string fullName, string role, string password, string teamId, string phone)
  {
    var salt = PasswordHasher.GenerateSalt();
    var hash = PasswordHasher.Hash(password, salt);
    return new User
    {
      Id           = id,
      Email        = email,
      FullName     = fullName,
      Role         = role,
      Phone        = phone,
      TeamId       = teamId,
      PasswordSalt = salt,
      PasswordHash = hash
    };
  }
}
