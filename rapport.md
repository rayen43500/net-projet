# Rapport - Fonctionnalites existantes

## Vue d ensemble

Projet monorepo avec:
- Backend ASP.NET Core Web API (.NET 8)
- Base de donnees MongoDB (Docker)
- Frontend React + TypeScript + MUI

## Backend (API)

### Modules exposes
- Auth (JWT) avec endpoint de login demo
- Clients
- Projets
- Taches
- Tickets support
- Utilisateurs
- Services
- Demandes de devis
- Devis
- Factures
- Paiements
- Documents
- Blog
- Promotions
- Notifications
- Equipes
- Roles
- Audit log
- Health check
- Chat temps reel (SignalR)

### Endpoints principaux (CRUD)
- GET /api/health
- POST /api/auth/login
- /api/clients
- /api/projects
- /api/tasks
- /api/tickets
- /api/users
- /api/services
- /api/quote-requests
- /api/quotes
- /api/invoices
- /api/payments
- /api/documents
- /api/blog-posts
- /api/promotions
- /api/notifications
- /api/teams
- /api/roles
- /api/audit-logs

Chaque module CRUD expose:
- GET (liste)
- GET {id}
- POST (creation)
- PUT {id} (mise a jour)
- DELETE {id}

### Entites MongoDB
- User
- Client
- Project
- TaskItem
- Ticket
- ServiceItem
- QuoteRequest
- Quote
- Invoice
- Payment
- DocumentItem
- BlogPost
- Promotion
- Notification
- Team
- Role
- AuditLog

## Frontend (React)

### Pages/modules
- Dashboard
- Services
- Projets
- Clients
- Taches
- Demandes de devis
- Devis
- Factures
- Paiements
- Documents
- Support (tickets)
- Blog
- Promotions
- Notifications
- Equipes
- Roles
- Audit log

### Navigation
- Barre de navigation avec acces a tous les modules
- Routeur React configure pour chaque page

## Infrastructure

- Docker Compose pour MongoDB + mongo-express
- Vite pour le frontend
- Proxy API: /api vers le backend

## Etat actuel

- Le backend et le frontend sont structures et fonctionnels.
- Les modules sont exposes par des endpoints CRUD et des pages front de base.
- L integration UI/UX avancee et la logique metier detaillee restent a etendre.
