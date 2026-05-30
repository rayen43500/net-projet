import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography
} from "@mui/material";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import StatCard from "../components/StatCard";

const quickLinks = [
  { label: "Clients", path: "/clients" },
  { label: "Projets", path: "/projects" },
  { label: "Factures", path: "/invoices" },
  { label: "Documents", path: "/documents" }
];

const categories = [
  { title: "Transformation digitale", subtitle: "Sites, apps, UX" },
  { title: "Infra & cloud", subtitle: "Hosting, DevOps" },
  { title: "IA & data", subtitle: "Automatisation" },
  { title: "Support & SLA", subtitle: "Tickets, monitoring" }
];

const highlights = [
  "Workflow devis -> projet -> facture",
  "Suivi temps reel des taches",
  "Audit log centralise",
  "Statistiques operationnelles"
];

const notifications = [
  "Nouveau devis cree",
  "Paiement recu",
  "Ticket support ouvert",
  "Projet livre"
];

const popularServices = [
  { title: "ERP sur mesure", price: "a partir de 8,000" },
  { title: "Migration cloud", price: "a partir de 4,500" },
  { title: "Application mobile", price: "a partir de 6,000" }
];

const testimonials = [
  { name: "Amine T.", company: "Alpha Corp", quote: "Pilotage clair et gain de temps immediat." },
  { name: "Sara M.", company: "Nova Studio", quote: "Dashboard ultra lisible, equipe plus reactive." }
];

const HomePage = () => {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reason = params.get("reason");
  const token = useSelector((state: RootState) => state.auth.token);

  return (
    <Box>
      {reason === "logout" ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          Deconnexion reussie. Vous etes revenu sur la page d'accueil.
        </Alert>
      ) : null}
      <Box
        sx={{
          mb: 5,
          p: { xs: 3, md: 5 },
          borderRadius: 4,
          background: "linear-gradient(135deg, #0f3d3e 0%, #1e5f60 55%, #f2a154 100%)",
          color: "#fff",
          position: "relative",
          overflow: "hidden"
        }}
      >
        <Box
          sx={{
            position: "absolute",
            width: 260,
            height: 260,
            borderRadius: "50%",
            bgcolor: "rgba(255,255,255,0.12)",
            top: -80,
            right: -60
          }}
        />
        <Grid container spacing={3} alignItems="center" sx={{ position: "relative" }}>
          <Grid item xs={12} md={7}>
            <Typography variant="h3" sx={{ mb: 1, fontWeight: 700 }}>
              Bienvenue dans votre ERP digital
            </Typography>
            <Typography variant="body1" sx={{ mb: 3, opacity: 0.9 }}>
              Unifiez projets, clients, facturation et support avec un flux de travail clair.
            </Typography>
            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <TextField
                fullWidth
                placeholder="Rechercher un client, projet ou facture"
                sx={{ bgcolor: "#fff", borderRadius: 2 }}
                InputProps={{
                  sx: { borderRadius: 2 }
                }}
              />
              <Button variant="contained" color="secondary" sx={{ px: 4 }}>
                Rechercher
              </Button>
            </Stack>
            <Stack direction="row" spacing={1} flexWrap="wrap" sx={{ mt: 2 }}>
              {highlights.map((item) => (
                <Chip key={item} label={item} sx={{ bgcolor: "rgba(255,255,255,0.2)", color: "#fff" }} />
              ))}
            </Stack>
            <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
              {!token ? (
                <>
                  <Button component={Link} to="/login" variant="contained" color="secondary">
                    Se connecter
                  </Button>
                  <Button component={Link} to="/signup" variant="outlined" sx={{ borderColor: "#fff", color: "#fff" }}>
                    Creer un compte
                  </Button>
                </>
              ) : (
                <Button component={Link} to="/dashboard" variant="contained" color="secondary">
                  Aller au dashboard
                </Button>
              )}
            </Stack>
          </Grid>
          <Grid item xs={12} md={5}>
            <Stack spacing={2}>
              <Typography variant="overline" sx={{ opacity: 0.8 }}>
                Trusted by
              </Typography>
              <Stack direction="row" spacing={1} flexWrap="wrap">
                {["Alpha", "Nova", "Kora", "Tek-Up"].map((brand) => (
                  <Chip key={brand} label={brand} sx={{ bgcolor: "rgba(255,255,255,0.18)", color: "#fff" }} />
                ))}
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Clients" value={245} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Projets actifs" value={32} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Factures en attente" value={18} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Tickets ouverts" value={7} />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {categories.map((category) => (
          <Grid item xs={12} md={3} key={category.title}>
            <Card sx={{ height: "100%" }}>
              <CardContent>
                <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                  {category.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {category.subtitle}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Acces rapide
              </Typography>
              <Stack direction="row" spacing={2} flexWrap="wrap">
                {quickLinks.map((item) => (
                  <Button key={item.path} variant="outlined" component={Link} to={item.path}>
                    {item.label}
                  </Button>
                ))}
              </Stack>
              <Divider sx={{ my: 2 }} />
              <Typography variant="body2" color="text.secondary">
                Utilisez les raccourcis pour demarrer rapidement la gestion quotidienne.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Services populaires
              </Typography>
              <Stack spacing={1}>
                {popularServices.map((item) => (
                  <Box key={item.title} sx={{ display: "flex", justifyContent: "space-between" }}>
                    <Typography variant="body2">{item.title}</Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.price}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Dernieres notifications
              </Typography>
              <Stack spacing={1}>
                {notifications.map((item) => (
                  <Typography key={item} variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Activites recentes
              </Typography>
              <Stack spacing={1}>
                {[
                  "Projet Site vitrine mis a jour",
                  "Nouvelle tache assignee",
                  "Facture INV-2026-01 creee"
                ].map((item) => (
                  <Typography key={item} variant="body2" color="text.secondary">
                    {item}
                  </Typography>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2 }}>
                Avis clients
              </Typography>
              <Stack spacing={2}>
                {testimonials.map((item) => (
                  <Box key={item.name}>
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      {item.name} - {item.company}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {item.quote}
                    </Typography>
                  </Box>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
