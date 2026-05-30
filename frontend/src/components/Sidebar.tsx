import { Box, Divider, Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { Link, useLocation } from "react-router-dom";

const navigationSections = [
  {
    title: "Accueil",
    items: [
      { label: "Home", path: "/" },
      { label: "Dashboard", path: "/dashboard" }
    ]
  },
  {
    title: "Gestion",
    items: [
      { label: "Clients", path: "/clients" },
      { label: "Projets", path: "/projects" },
      { label: "Taches", path: "/tasks" },
      { label: "Equipes", path: "/teams" }
    ]
  },
  {
    title: "Commercial",
    items: [
      { label: "Services", path: "/services" },
      { label: "Demandes devis", path: "/quote-requests" },
      { label: "Devis", path: "/quotes" },
      { label: "Factures", path: "/invoices" },
      { label: "Paiements", path: "/payments" }
    ]
  },
  {
    title: "Contenu",
    items: [
      { label: "Documents", path: "/documents" },
      { label: "Blog", path: "/blog" },
      { label: "Promotions", path: "/promotions" }
    ]
  },
  {
    title: "Administration",
    items: [
      { label: "Utilisateurs", path: "/users" },
      { label: "Roles", path: "/roles" },
      { label: "Notifications", path: "/notifications" },
      { label: "Audit Logs", path: "/audit-logs" },
      { label: "Parametres", path: "/settings" }
    ]
  },
  {
    title: "Communication",
    items: [{ label: "Chat", path: "/chat" }]
  }
];

const Sidebar = () => {
  const location = useLocation();

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: 240,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: { width: 240, boxSizing: "border-box" }
      }}
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          Navigation
        </Typography>
      </Box>
      <Divider />
      <Box sx={{ overflow: "auto" }}>
        {navigationSections.map((section) => (
          <Box key={section.title} sx={{ px: 1, py: 1 }}>
            <Typography variant="overline" color="text.secondary" sx={{ px: 1 }}>
              {section.title}
            </Typography>
            <List dense>
              {section.items.map((item) => (
                <ListItemButton
                  key={item.path}
                  component={Link}
                  to={item.path}
                  selected={location.pathname === item.path}
                >
                  <ListItemText primary={item.label} />
                </ListItemButton>
              ))}
            </List>
          </Box>
        ))}
      </Box>
    </Drawer>
  );
};

export default Sidebar;
