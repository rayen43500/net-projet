import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  MenuItem,
  Stack,
  TextField,
  Typography,
  InputAdornment
} from "@mui/material";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { apiClient } from "../api/client";
import { setAuth } from "../features/auth/authSlice";
import { authStorage } from "../features/auth/authStorage";

const roles = ["Admin", "Manager", "Developer", "Client"];

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [role, setRole] = useState("Client");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async () => {
    setError(null);
    try {
      const response = await apiClient.post("/auth/register", {
        fullName,
        email,
        phone,
        role,
        password
      });

      const { token, role: roleResult, userId } = response.data as {
        token: string;
        role: string;
        userId: string;
      };

      dispatch(setAuth({ token, role: roleResult, userId }));
      authStorage.save({ token, role: roleResult, userId });
      navigate("/dashboard", { replace: true });
    } catch {
      setError("Impossible de creer le compte.");
    }
  };

  return (
    <Box sx={{ maxWidth: 460, mx: "auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h5" sx={{ mb: 2 }}>
            Inscription
          </Typography>
          <Stack spacing={2}>
            {error ? <Alert severity="error">{error}</Alert> : null}
            <TextField
              label="Nom complet"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            <TextField
              label="Email"
              value={email}
              onChange={(event) => setEmail(event.target.value)}
            />
            <TextField
              label="Telephone"
              value={phone}
              onChange={(event) => setPhone(event.target.value)}
            />
            <TextField select label="Role" value={role} onChange={(event) => setRole(event.target.value)}>
              {roles.map((item) => (
                <MenuItem key={item} value={item}>
                  {item}
                </MenuItem>
              ))}
            </TextField>
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
              Creer un compte
            </Button>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Signup;
