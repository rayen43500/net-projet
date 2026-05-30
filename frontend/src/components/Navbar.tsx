import { AppBar, Box, Button, Stack, Toolbar, Typography } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import type { RootState } from "../store";
import { clearAuth } from "../features/auth/authSlice";
import { authStorage } from "../features/auth/authStorage";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const token = useSelector((state: RootState) => state.auth.token);

  const handleLogout = () => {
    dispatch(clearAuth());
    authStorage.clear();
    navigate("/?reason=logout");
  };

  return (
    <AppBar position="sticky" color="primary" elevation={0}>
      <Toolbar sx={{ gap: 2 }}>
        <Typography variant="h6" component={Link} to="/" sx={{ color: "inherit", textDecoration: "none" }}>
          Digital Services Platform
        </Typography>
        <Box sx={{ flex: 1 }} />
        <Stack direction="row" spacing={1}>
          {token ? (
            <>
              <Button color="inherit" component={Link} to="/dashboard">
                Dashboard
              </Button>
              <Button color="inherit" component={Link} to="/search">
                Recherche
              </Button>
              <Button color="inherit" component={Link} to="/profile">
                Profil
              </Button>
              <Button color="inherit" onClick={handleLogout}>
                Deconnexion
              </Button>
            </>
          ) : (
            <>
              <Button color="inherit" component={Link} to="/login">
                Connexion
              </Button>
              <Button color="inherit" component={Link} to="/signup">
                Inscription
              </Button>
            </>
          )}
        </Stack>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
