import { Box, Divider, Drawer, List, ListItemButton, ListItemText, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { canAccess, navigationSections } from "../features/auth/access";
import type { RootState } from "../store";

const Sidebar = () => {
  const location = useLocation();
  const role = useSelector((state: RootState) => state.auth.role);
  const visibleSections = navigationSections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => canAccess(role, item.roles))
    }))
    .filter((section) => section.items.length > 0);

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
        {visibleSections.map((section) => (
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
