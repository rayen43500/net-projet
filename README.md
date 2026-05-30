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
- Par defaut, l API ecoute sur http://localhost:5000 et expose Swagger sur /swagger.
- Le frontend proxy les appels /api vers le backend.

## Remarques

- Les identites sont en format ObjectId MongoDB.
- Le module Auth fournit un endpoint de login de demo.
