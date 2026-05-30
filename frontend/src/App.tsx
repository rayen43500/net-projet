import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import { Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/Dashboard";

const App = () => {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      <AppBar position="static" color="primary">
        <Toolbar sx={{ gap: 2 }}>
          <Typography variant="h6" component="div">
            Digital Services Platform
          </Typography>
          <Box sx={{ flex: 1 }} />
          <Typography component={Link} to="/" color="inherit" sx={{ textDecoration: "none" }}>
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        <Routes>
          <Route path="/" element={<Dashboard />} />
        </Routes>
      </Container>
    </Box>
  );
};

export default App;
