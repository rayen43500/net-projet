import { Box, Button, Card, CardContent, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { apiClient } from "../api/client";
import type { RootState } from "../store";

const Profile = () => {
  const authUserId = useSelector((state: RootState) => state.auth.userId);
  const [userId, setUserId] = useState("");
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [teamId, setTeamId] = useState("");
  const [avatarUrl, setAvatarUrl] = useState("");
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    if (authUserId) {
      setUserId(authUserId);
    }
  }, [authUserId]);

  const loadProfile = async () => {
    if (!userId) {
      setStatus("Veuillez saisir un UserId.");
      return;
    }

    const response = await apiClient.get(`/profile/${userId}`);
    setFullName(response.data.fullName ?? "");
    setPhone(response.data.phone ?? "");
    setTeamId(response.data.teamId ?? "");
    setAvatarUrl(response.data.avatarUrl ?? "");
    setStatus("Profil charge.");
  };

  const saveProfile = async () => {
    if (!userId) {
      setStatus("Veuillez saisir un UserId.");
      return;
    }

    await apiClient.put(`/profile/${userId}`, {
      fullName,
      phone,
      teamId,
      avatarUrl
    });
    setStatus("Profil mis a jour.");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Profil utilisateur
      </Typography>
      <Card>
        <CardContent>
          <Stack spacing={2}>
            <TextField
              label="UserId"
              value={userId}
              onChange={(event) => setUserId(event.target.value)}
              helperText="Utilisez un UserId existant (seed ou cree via API)"
            />
            <TextField
              label="Nom complet"
              value={fullName}
              onChange={(event) => setFullName(event.target.value)}
            />
            <TextField label="Telephone" value={phone} onChange={(event) => setPhone(event.target.value)} />
            <TextField label="Equipe" value={teamId} onChange={(event) => setTeamId(event.target.value)} />
            <TextField
              label="Avatar URL"
              value={avatarUrl}
              onChange={(event) => setAvatarUrl(event.target.value)}
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="outlined" onClick={loadProfile}>
                Charger
              </Button>
              <Button variant="contained" onClick={saveProfile}>
                Enregistrer
              </Button>
            </Stack>
            {status ? (
              <Typography variant="body2" color="text.secondary">
                {status}
              </Typography>
            ) : null}
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Profile;
