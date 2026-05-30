import { AppBar, Box, Button, Container, Stack, Toolbar, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
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

const App = () => {
  const navItems = [
    { label: "Dashboard", path: "/" },
    { label: "Services", path: "/services" },
    { label: "Projets", path: "/projects" },
    { label: "Clients", path: "/clients" },
    { label: "Taches", path: "/tasks" },
    { label: "Demandes devis", path: "/quote-requests" },
    { label: "Devis", path: "/quotes" },
    { label: "Factures", path: "/invoices" },
    { label: "Paiements", path: "/payments" },
    { label: "Documents", path: "/documents" },
    { label: "Support", path: "/tickets" },
    { label: "Blog", path: "/blog" },
    { label: "Promotions", path: "/promotions" },
    { label: "Notifications", path: "/notifications" },
    { label: "Equipes", path: "/teams" },
    { label: "Roles", path: "/roles" },
    { label: "Audit", path: "/audit-logs" }
  ];

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ gap: 2, flexWrap: "wrap" }}>
          <Typography variant="h6" component="div">
            Digital Services Platform
          </Typography>
          <Stack direction="row" spacing={1} sx={{ flex: 1, flexWrap: "wrap" }}>
            {navItems.map((item) => (
              <Button
                key={item.path}
                component={Link}
                to={item.path}
                color="inherit"
                size="small"
              >
                {item.label}
              </Button>
            ))}
          </Stack>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/services" element={<Services />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/quote-requests" element={<QuoteRequests />} />
          <Route path="/quotes" element={<Quotes />} />
          <Route path="/invoices" element={<Invoices />} />
          <Route path="/payments" element={<Payments />} />
          <Route path="/documents" element={<Documents />} />
          <Route path="/tickets" element={<Tickets />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/promotions" element={<Promotions />} />
          <Route path="/notifications" element={<Notifications />} />
          <Route path="/teams" element={<Teams />} />
          <Route path="/roles" element={<Roles />} />
          <Route path="/audit-logs" element={<AuditLogs />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
