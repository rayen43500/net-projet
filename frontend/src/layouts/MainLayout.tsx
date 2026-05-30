import { Box, Container } from "@mui/material";
import { Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import type { RootState } from "../store";

const MainLayout = () => {
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f6f7fb" }}>
      {token ? <Sidebar /> : null}
      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <Navbar />
        <Container sx={{ py: 4, flex: 1 }}>
          <Outlet />
        </Container>
        <Footer />
      </Box>
    </Box>
  );
};

export default MainLayout;
