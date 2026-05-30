# Plateforme de Digitalisation et Gestion des Services Informatiques

Monorepo pour une application web complete avec frontend React et backend ASP.NET Core Web API connecte a MongoDB.

## Stack

- Frontend: React, TypeScript, MUI, React Router, Redux Toolkit, Axios
- Backend: ASP.NET Core Web API (.NET 8), MongoDB Driver, JWT, SignalR, Swagger
- Base de donnees: MongoDB (via Docker)

## Structure

- frontend/ : application React
- backend/Platform.Api/ : API ASP.NET Core
- docker-compose.yml : MongoDB + mongo-express

## Modules couverts

- Auth, utilisateurs et roles
- Clients, services, devis, factures, paiements
- Projets, taches, documents, tickets support
- Blog, promotions, notifications, audit log

## Demarrage rapide (Windows)

1) Lancer MongoDB

```powershell
docker compose up -d
```

2) Lancer le backend

```powershell
cd backend\Platform.Api
dotnet restore
dotnet run
```

3) Lancer le frontend

```powershell
cd frontend
npm install
npm run dev
```

## Configuration

- La chaine de connexion MongoDB est dans backend/Platform.Api/appsettings.json.
- Par defaut, le backend utilise MongoDB local sans authentification: mongodb://localhost:27017.
- Par defaut, l API ecoute sur http://localhost:5000 et expose Swagger sur /swagger.
- Le frontend proxy les appels /api vers le backend.

## Comptes de demo

- Admin: admin@dsp.local / Admin@123
- Manager: manager@dsp.local / Manager@123
- Developer: developer@dsp.local / Developer@123
- Client: client@dsp.local / Client@123

## Remarques

- Les identites sont en format ObjectId MongoDB.
- Le module Auth fournit un endpoint de login de demo.

## API de base

- GET /api/health
- POST /api/auth/login
- CRUD: /api/clients, /api/services, /api/projects, /api/tasks
- CRUD: /api/quote-requests, /api/quotes, /api/invoices, /api/payments
- CRUD: /api/documents, /api/tickets, /api/blog-posts
- CRUD: /api/promotions, /api/notifications, /api/teams, /api/roles, /api/audit-logs
