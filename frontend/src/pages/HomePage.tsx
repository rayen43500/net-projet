import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Grid,
  InputAdornment,
  Stack,
  TextField,
  Typography,
  useTheme
} from "@mui/material";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSelector } from "react-redux";
import type { RootState } from "../store";
import StatCard from "../components/StatCard";

const categories = [
  "Developpement web",
  "Applications mobile",
  "Design UI/UX",
  "Cloud & DevOps",
  "IA & automatisation",
  "Support SLA"
];

const marketplaceServices = [
  {
    title: "Site vitrine premium livre avec SEO technique",
    seller: "Studio Admin",
    price: "800",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Dashboard ERP sur mesure pour equipes operations",
    seller: "Manager Pro",
    price: "1,500",
    rating: "4.8",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Application mobile client avec espace prive",
    seller: "Dev Team",
    price: "2,200",
    rating: "4.7",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Migration cloud securisee avec monitoring",
    seller: "Cloud Ops",
    price: "1,200",
    rating: "4.9",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
  }
];

const quickLinks = [
  { label: "Catalogue services", path: "/services" },
  { label: "Demander un devis", path: "/quote-requests" },
  { label: "Suivre un projet", path: "/projects" },
  { label: "Support client", path: "/tickets" }
];

const HomePage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const reason = params.get("reason");
  const token = useSelector((state: RootState) => state.auth.token);
  const role = useSelector((state: RootState) => state.auth.role);
  const [query, setQuery] = useState("");

  const handleSearch = () => {
    const encoded = encodeURIComponent(query.trim());
    if (token) {
      navigate(`/services${encoded ? `?q=${encoded}` : ""}`);
      return;
    }

    navigate("/signup");
  };

  return (
    <Box>
      {reason === "logout" ? (
        <Alert severity="info" sx={{ mb: 3 }}>
          Deconnexion reussie. Vous etes revenu sur la page d'accueil.
        </Alert>
      ) : null}

      <Box
        sx={{
          minHeight: { xs: 460, md: 520 },
          display: "flex",
          alignItems: "center",
          mb: 4,
          px: { xs: 2, md: 6 },
          py: { xs: 5, md: 7 },
          borderRadius: 2,
          color: "#fff",
          backgroundImage:
            "linear-gradient(90deg, rgba(6,44,38,0.88), rgba(6,44,38,0.54)), url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
      >
        <Box sx={{ width: "100%", maxWidth: 760 }}>
          <Typography variant="overline" sx={{ color: "rgba(255,255,255,0.78)" }}>
            Plateforme services digitaux
          </Typography>
          <Typography variant="h3" sx={{ fontWeight: 800, mb: 2 }}>
            Trouvez, commandez et pilotez vos services IT au meme endroit
          </Typography>
          <Typography variant="body1" sx={{ maxWidth: 620, mb: 3, color: "rgba(255,255,255,0.86)" }}>
            Un parcours inspire marketplace: recherche rapide, catalogue de prestations, devis, projets,
            factures, support et suivi par role.
          </Typography>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mb: 2 }}>
            <TextField
              fullWidth
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  handleSearch();
                }
              }}
              placeholder="Que voulez-vous creer ? site web, app mobile, cloud..."
              sx={{ bgcolor: "#fff", borderRadius: 1 }}
              InputProps={{
                startAdornment: <InputAdornment position="start">Search</InputAdornment>,
                sx: { borderRadius: 1 }
              }}
            />
            <Button variant="contained" color="secondary" onClick={handleSearch} sx={{ px: 4 }}>
              Rechercher
            </Button>
          </Stack>

          <Stack direction="row" spacing={1} flexWrap="wrap">
            {categories.slice(0, 5).map((category) => (
              <Chip
                key={category}
                label={category}
                onClick={() => {
                  setQuery(category);
                  if (token) {
                    navigate(`/services?q=${encodeURIComponent(category)}`);
                  }
                }}
                sx={{ bgcolor: "rgba(255,255,255,0.16)", color: "#fff", mb: 1 }}
              />
            ))}
          </Stack>

          <Stack direction={{ xs: "column", sm: "row" }} spacing={2} sx={{ mt: 3 }}>
            {token ? (
              <Button component={Link} to="/dashboard" variant="contained" color="secondary">
                Aller au dashboard
              </Button>
            ) : (
              <>
                <Button component={Link} to="/signup" variant="contained" color="secondary">
                  Creer un compte
                </Button>
                <Button component={Link} to="/login" variant="outlined" sx={{ borderColor: "#fff", color: "#fff" }}>
                  Se connecter
                </Button>
              </>
            )}
          </Stack>
        </Box>
      </Box>

      <Grid container spacing={2.5} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Services actifs" value="42" helper="Catalogue pret a vendre" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Roles couverts" value="4" helper={role ? `Connecte: ${role}` : "Admin, manager, dev, client"} />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Workflow" value="Devis -> Projet" helper="Facture et paiement inclus" />
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <StatCard label="Support" value="24/7" helper="Tickets et chat" />
        </Grid>
      </Grid>

      <Stack direction="row" justifyContent="space-between" alignItems={{ xs: "flex-start", sm: "center" }} sx={{ mb: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700 }}>
            Services populaires
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Des offres pretes a transformer en demandes, devis et projets.
          </Typography>
        </Box>
        <Button component={Link} to={token ? "/services" : "/signup"} variant="outlined">
          Voir tout
        </Button>
      </Stack>

      <Grid container spacing={3} sx={{ mb: 4 }}>
        {marketplaceServices.map((service) => (
          <Grid item xs={12} sm={6} md={3} key={service.title}>
            <Card sx={{ height: "100%", overflow: "hidden" }}>
              <CardMedia component="img" height="150" image={service.image} alt={service.title} />
              <CardContent>
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1 }}>
                  <Avatar sx={{ width: 28, height: 28, bgcolor: theme.palette.primary.main }}>
                    {service.seller.slice(0, 1)}
                  </Avatar>
                  <Typography variant="body2" color="text.secondary">
                    {service.seller}
                  </Typography>
                </Stack>
                <Typography variant="subtitle1" sx={{ minHeight: 72, fontWeight: 600 }}>
                  {service.title}
                </Typography>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
                  <Typography variant="body2" color="text.secondary">
                    Rating {service.rating}
                  </Typography>
                  <Typography variant="subtitle2">a partir de {service.price}</Typography>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                Raccourcis operationnels
              </Typography>
              <Grid container spacing={1.5}>
                {quickLinks.map((item) => (
                  <Grid item xs={12} sm={6} key={item.path}>
                    <Button fullWidth variant="outlined" component={Link} to={token ? item.path : "/signup"}>
                      {item.label}
                    </Button>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card>
            <CardContent>
              <Typography variant="h5" sx={{ mb: 2, fontWeight: 700 }}>
                Parcours client
              </Typography>
              <Stack spacing={1.5}>
                {["Rechercher un service", "Envoyer une demande", "Valider un devis", "Suivre projet, documents et paiement"].map(
                  (item, index) => (
                    <Stack key={item} direction="row" spacing={1.5} alignItems="center">
                      <Avatar sx={{ width: 30, height: 30, bgcolor: theme.palette.secondary.main }}>{index + 1}</Avatar>
                      <Typography variant="body2">{item}</Typography>
                    </Stack>
                  )
                )}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default HomePage;
