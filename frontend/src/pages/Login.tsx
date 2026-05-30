import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Stack,
  TextField,
  Typography,
  InputAdornment
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import { setAuth } from "../features/auth/authSlice";
import { authStorage } from "../features/auth/authStorage";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const from = (location.state as { from?: string } | null)?.from ?? "/dashboard";

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await apiClient.post("/auth/login", { email, password });
      const { token, role, userId } = response.data as {
        token: string;
        role: string;
        userId: string;
      };

      dispatch(setAuth({ token, role, userId }));
      authStorage.save({ token, role, userId });
      navigate(from, { replace: true });
    } catch {
      setError("Identifiants invalides.");
    }
  };

  return (
    <Box sx={{ maxWidth: 420, mx: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Connexion
          </Typography>
          <Stack spacing={2}>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Mot de passe"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Button onClick={() => setShowPassword((prev) => !prev)} size="small">
                      {showPassword ? "Masquer" : "Voir"}
                    </Button>
                  </InputAdornment>
                )
              }}
            />
            <Button variant="contained" onClick={handleSubmit}>
              Se connecter
            </Button>
            <Button component={Link} to="/signup">
              Creer un compte
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Login;
