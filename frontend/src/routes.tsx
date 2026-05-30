import { RouteObject } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
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

export const routes: RouteObject[] = [
	{ path: "/", element: <Dashboard /> },
	{ path: "/services", element: <Services /> },
	{ path: "/projects", element: <Projects /> },
	{ path: "/clients", element: <Clients /> },
	{ path: "/tasks", element: <Tasks /> },
	{ path: "/quote-requests", element: <QuoteRequests /> },
	{ path: "/quotes", element: <Quotes /> },
	{ path: "/invoices", element: <Invoices /> },
	{ path: "/payments", element: <Payments /> },
	{ path: "/documents", element: <Documents /> },
	{ path: "/tickets", element: <Tickets /> },
	{ path: "/blog", element: <Blog /> },
	{ path: "/promotions", element: <Promotions /> },
	{ path: "/notifications", element: <Notifications /> },
	{ path: "/teams", element: <Teams /> },
	{ path: "/roles", element: <Roles /> },
	{ path: "/audit-logs", element: <AuditLogs /> }
];
