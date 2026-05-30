import { Box, Container, Typography } from "@mui/material";
import { Outlet } from "react-router-dom";

const AuthLayout = () => {
  return (
    <Box sx={{ minHeight: "100vh", display: "grid", placeItems: "center", bgcolor: "#f2f4f8" }}>
      <Container maxWidth="sm" sx={{ textAlign: "center" }}>
        <Typography variant="h4" sx={{ mb: 2 }}>
          Digital Services Platform
        </Typography>
        <Outlet />
      </Container>
    </Box>
  );
};

export default AuthLayout;
