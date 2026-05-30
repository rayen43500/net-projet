import { RouteObject } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/HomePage";
import Dashboard from "./pages/Dashboard";
import AdvancedStats from "./pages/AdvancedStats";
import Services from "./pages/Services";
import Projects from "./pages/Projects";
import Clients from "./pages/Clients";
import Tasks from "./pages/Tasks";
import QuoteRequests from "./pages/QuoteRequests";
import Quotes from "./pages/Quotes";
import Invoices from "./pages/Invoices";
import Payments from "./pages/Payments";
import Documents from "./pages/Documents";
import Tickets from "./pages/Tickets";
import Blog from "./pages/Blog";
import Promotions from "./pages/Promotions";
import Notifications from "./pages/Notifications";
import Teams from "./pages/Teams";
import Roles from "./pages/Roles";
import AuditLogs from "./pages/AuditLogs";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Chat from "./pages/Chat";
import Search from "./pages/Search";
import ModulePage from "./pages/ModulePage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import RequireAuth from "./features/auth/RequireAuth";

export const routes: RouteObject[] = [
  {
    path: "/login",
    element: <AuthLayout />,
    children: [{ index: true, element: <Login /> }]
  },
	{
		path: "/signup",
		element: <AuthLayout />,
		children: [{ index: true, element: <Signup /> }]
	},
	{
		path: "/",
		element: <MainLayout />,
		children: [
			{ index: true, element: <HomePage /> },
			{
				path: "dashboard",
				element: (
					<RequireAuth>
						<Dashboard />
					</RequireAuth>
				)
			},
			{
				path: "stats",
				element: (
					<RequireAuth>
						<AdvancedStats />
					</RequireAuth>
				)
			},
			{
				path: "search",
				element: (
					<RequireAuth>
						<Search />
					</RequireAuth>
				)
			},
			{
				path: "services",
				element: (
					<RequireAuth>
						<Services />
					</RequireAuth>
				)
			},
			{
				path: "projects",
				element: (
					<RequireAuth>
						<Projects />
					</RequireAuth>
				)
			},
			{
				path: "clients",
				element: (
					<RequireAuth>
						<Clients />
					</RequireAuth>
				)
			},
			{
				path: "tasks",
				element: (
					<RequireAuth>
						<Tasks />
					</RequireAuth>
				)
			},
			{
				path: "quote-requests",
				element: (
					<RequireAuth>
						<QuoteRequests />
					</RequireAuth>
				)
			},
			{
				path: "quotes",
				element: (
					<RequireAuth>
						<Quotes />
					</RequireAuth>
				)
			},
			{
				path: "invoices",
				element: (
					<RequireAuth>
						<Invoices />
					</RequireAuth>
				)
			},
			{
				path: "payments",
				element: (
					<RequireAuth>
						<Payments />
					</RequireAuth>
				)
			},
			{
				path: "documents",
				element: (
					<RequireAuth>
						<Documents />
					</RequireAuth>
				)
			},
			{
				path: "tickets",
				element: (
					<RequireAuth>
						<Tickets />
					</RequireAuth>
				)
			},
			{
				path: "blog",
				element: (
					<RequireAuth>
						<Blog />
					</RequireAuth>
				)
			},
			{
				path: "promotions",
				element: (
					<RequireAuth>
						<Promotions />
					</RequireAuth>
				)
			},
			{
				path: "notifications",
				element: (
					<RequireAuth>
						<Notifications />
					</RequireAuth>
				)
			},
			{
				path: "teams",
				element: (
					<RequireAuth>
						<Teams />
					</RequireAuth>
				)
			},
			{
				path: "roles",
				element: (
					<RequireAuth>
						<Roles />
					</RequireAuth>
				)
			},
			{
				path: "audit-logs",
				element: (
					<RequireAuth>
						<AuditLogs />
					</RequireAuth>
				)
			},
			{
				path: "profile",
				element: (
					<RequireAuth>
						<Profile />
					</RequireAuth>
				)
			},
			{
				path: "settings",
				element: (
					<RequireAuth>
						<Settings />
					</RequireAuth>
				)
			},
			{
				path: "chat",
				element: (
					<RequireAuth>
						<Chat />
					</RequireAuth>
				)
			},
			{
				path: "users",
				element: (
					<RequireAuth>
						<ModulePage
							title="Utilisateurs"
							description="Gestion des comptes utilisateurs, acces et roles."
							actions={["Nouvel utilisateur", "Exporter", "Actualiser"]}
							searchPlaceholder="Rechercher un utilisateur"
							columns={["Nom", "Email", "Role", "Actions"]}
							rows={[["Admin", "admin@dsp.local", "Admin", "Voir"]]}
						/>
					</RequireAuth>
				)
			}
		]
	}
];
