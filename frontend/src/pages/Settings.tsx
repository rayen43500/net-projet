import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  FormControlLabel,
  Stack,
  Switch,
  TextField,
  Typography
} from "@mui/material";
import { useEffect, useState } from "react";

const SETTINGS_KEY = "dsp.settings";

const defaultSettings = {
  platformName: "Digital Services Platform",
  supportEmail: "support@dsp.local",
  notifyByEmail: true,
  requireApproval: true
};

const Settings = () => {
  const [settings, setSettings] = useState(defaultSettings);
  const [status, setStatus] = useState<string | null>(null);

  useEffect(() => {
    const raw = localStorage.getItem(SETTINGS_KEY);
    if (raw) {
      setSettings({ ...defaultSettings, ...JSON.parse(raw) });
    }
  }, []);

  const saveSettings = () => {
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(settings));
    setStatus("Parametres enregistres.");
  };

  const resetSettings = () => {
    setSettings(defaultSettings);
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(defaultSettings));
    setStatus("Parametres reinitialises.");
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        Parametres
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        Configuration de la plateforme, notifications et securite.
      </Typography>

      <Card>
        <CardContent>
          <Stack spacing={2}>
            {status ? <Alert severity="success">{status}</Alert> : null}
            <TextField
              label="Nom de la plateforme"
              value={settings.platformName}
              onChange={(event) => setSettings((prev) => ({ ...prev, platformName: event.target.value }))}
            />
            <TextField
              label="Email support"
              value={settings.supportEmail}
              onChange={(event) => setSettings((prev) => ({ ...prev, supportEmail: event.target.value }))}
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.notifyByEmail}
                  onChange={(event) => setSettings((prev) => ({ ...prev, notifyByEmail: event.target.checked }))}
                />
              }
              label="Notifications email"
            />
            <FormControlLabel
              control={
                <Switch
                  checked={settings.requireApproval}
                  onChange={(event) => setSettings((prev) => ({ ...prev, requireApproval: event.target.checked }))}
                />
              }
              label="Validation manager obligatoire pour les devis"
            />
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="contained" onClick={saveSettings}>
                Enregistrer
              </Button>
              <Button variant="outlined" onClick={resetSettings}>
                Reinitialiser
              </Button>
            </Stack>
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Settings;
