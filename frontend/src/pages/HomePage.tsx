import {
  Alert,
  Avatar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Container,
  Divider,
  Grid,
  InputAdornment,
  Paper,
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

// Beautiful custom icons for category cards
const categoriesList = [
  { name: "Developpement web", subtitle: "React, Angular, ASP.NET", image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&q=80&fit=crop&auto=format" },
  { name: "Applications mobile", subtitle: "iOS, Android, Flutter", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=800&q=80&fit=crop&auto=format" },
  { name: "Design UI/UX", subtitle: "Figma, Sketch, Adobe XD", image: "https://images.unsplash.com/photo-1626785774573-4b799315345d?w=800&q=80&fit=crop&auto=format" },
  { name: "Cloud & DevOps", subtitle: "AWS, Azure, Docker", image: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=800&q=80&fit=crop&auto=format" },
  { name: "IA & automatisation", subtitle: "OpenAI, LLM, Agents", image: "https://images.unsplash.com/photo-1620712943543-bcc4688e7485?w=800&q=80&fit=crop&auto=format" },
  { name: "Support SLA", subtitle: "Maintenance, Tickets 24/7", image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=800&q=80&fit=crop&auto=format" }
];

const marketplaceServices = [
  {
    title: "Site vitrine premium livre avec SEO technique optimise",
    seller: "Studio Admin",
    role: "Admin Pro",
    price: "800",
    rating: "4.9",
    reviewsCount: "124",
    image: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Dashboard ERP sur mesure pour equipes operations et logistique",
    seller: "Manager Pro",
    role: "Manager",
    price: "1,500",
    rating: "5.0",
    reviewsCount: "82",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Application mobile client native avec espace securise",
    seller: "Dev Team",
    role: "Developer",
    price: "2,200",
    rating: "4.8",
    reviewsCount: "67",
    image: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80"
  },
  {
    title: "Migration cloud securisee AWS/Azure avec monitoring intelligent",
    seller: "Cloud Ops",
    role: "Architecte Dev",
    price: "1,200",
    rating: "4.9",
    reviewsCount: "109",
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=900&q=80"
  }
];

const trustedBrands = ["Google", "Microsoft", "Netflix", "PayPal", "P&G", "Intel"];

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
    <Box sx={{ overflow: "hidden" }}>
      {/* Alert Banner */}
      {reason === "logout" ? (
        <Container maxWidth="lg" sx={{ mt: 2 }}>
          <Alert severity="success" sx={{ borderRadius: 3 }}>
            Deconnexion reussie. Vous etes revenu sur la page d'accueil de la marketplace.
          </Alert>
        </Container>
      ) : null}

      {/* 1. TunUpLancer Premium Hero Section */}
      <Box
        sx={{
          position: "relative",
          minHeight: { xs: 500, md: 580 },
          display: "flex",
          alignItems: "center",
          color: "#fff",
          backgroundImage:
            "linear-gradient(135deg, rgba(15, 61, 62, 0.95) 0%, rgba(6, 44, 38, 0.85) 100%), url(https://images.unsplash.com/photo-1497366754035-f200968a6e72?auto=format&fit=crop&w=1600&q=80)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          py: { xs: 6, md: 8 },
          mb: 4,
          borderBottom: "1px solid",
          borderColor: "rgba(255, 255, 255, 0.1)"
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={7.5}>
              <Box sx={{ pr: { md: 4 } }}>
                <Typography
                  variant="overline"
                  sx={{
                    color: "secondary.main",
                    fontWeight: "bold",
                    letterSpacing: 2,
                    textTransform: "uppercase",
                    display: "inline-block",
                    mb: 1
                  }}
                >
                  Marketplace Digitale Pro
                </Typography>
                <Typography
                  variant="h2"
                  sx={{
                    fontWeight: 800,
                    mb: 2.5,
                    fontSize: { xs: "2.2rem", sm: "3rem", md: "3.5rem" },
                    lineHeight: 1.15
                  }}
                >
                  Trouvez le service IT{" "}
                  <span style={{ color: theme.palette.secondary.main }}>parfait</span> pour votre business
                </Typography>
                <Typography
                  variant="body1"
                  sx={{
                    mb: 4,
                    color: "rgba(255,255,255,0.85)",
                    fontSize: { xs: "1rem", md: "1.15rem" },
                    lineHeight: 1.6,
                    maxWidth: 640
                  }}
                >
                  Inspire du modele TunUpLancer. Collaborez avec des developpeurs, managers et administrateurs qualifies.
                  Suivi de projet, validation de devis, facturation et chat integre.
                </Typography>

                {/* Premium Search Container */}
                <Paper
                  elevation={6}
                  sx={{
                    p: 0.5,
                    display: "flex",
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: "center",
                    borderRadius: 3,
                    bgcolor: "white",
                    mb: 3,
                    overflow: "hidden"
                  }}
                >
                  <TextField
                    fullWidth
                    variant="standard"
                    placeholder="De quoi votre projet a-t-il besoin ? (ex: React, Cloud, Design...)"
                    value={query}
                    onChange={(event) => setQuery(event.target.value)}
                    onKeyDown={(event) => {
                      if (event.key === "Enter") {
                        handleSearch();
                      }
                    }}
                    InputProps={{
                      disableUnderline: true,
                      startAdornment: (
                        <InputAdornment position="start" sx={{ pl: 2, color: "text.secondary" }}>
                          🔍
                        </InputAdornment>
                      ),
                      sx: {
                        py: 1.5,
                        px: 1,
                        color: "text.primary",
                        fontSize: "1rem"
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    onClick={handleSearch}
                    sx={{
                      height: { xs: 50, sm: 54 },
                      minWidth: { xs: "100%", sm: 160 },
                      borderRadius: 2.5,
                      fontWeight: "bold",
                      fontSize: "1rem",
                      bgcolor: "secondary.main",
                      color: "primary.main",
                      boxShadow: "none",
                      "&:hover": {
                        bgcolor: "secondary.dark"
                      }
                    }}
                  >
                    Rechercher
                  </Button>
                </Paper>

                {/* Popular Tags */}
                <Stack direction="row" spacing={1.5} flexWrap="wrap" alignItems="center">
                  <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.7)" }}>
                    Populaire :
                  </Typography>
                  {["React", "Mobile App", "DevOps", "IA", "UI/UX"].map((tag) => (
                    <Chip
                      key={tag}
                      label={tag}
                      onClick={() => {
                        setQuery(tag);
                        if (token) {
                          navigate(`/services?q=${encodeURIComponent(tag)}`);
                        }
                      }}
                      sx={{
                        bgcolor: "rgba(255,255,255,0.12)",
                        color: "#fff",
                        mb: 1,
                        fontWeight: "medium",
                        "&:hover": {
                          bgcolor: "rgba(255,255,255,0.22)"
                        }
                      }}
                    />
                  ))}
                </Stack>
              </Box>
            </Grid>

            {/* Right decorative visual block */}
            <Grid item xs={12} md={4.5} sx={{ display: { xs: "none", md: "block" } }}>
              <Paper
                elevation={4}
                sx={{
                  borderRadius: 4,
                  overflow: "hidden",
                  bgcolor: "rgba(255,255,255,0.06)",
                  backdropFilter: "blur(8px)",
                  border: "1px solid rgba(255, 255, 255, 0.15)",
                  p: 2.5
                }}
              >
                <Stack spacing={2}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Avatar sx={{ bgcolor: "secondary.main" }}>T</Avatar>
                    <Box>
                      <Typography variant="subtitle2" fontWeight="bold">TunUpLancer Pro Model</Typography>
                      <Typography variant="caption" sx={{ color: "rgba(255,255,255,0.7)" }}>IT Services Premium</Typography>
                    </Box>
                  </Stack>
                  <Divider sx={{ bgcolor: "rgba(255,255,255,0.1)" }} />
                  <Stack spacing={1.5}>
                    {["Devis direct en 1 clic", "Validation automatique par Manager", "Taches assignees aux Developpeurs", "Communication en temps reel"].map((feat, idx) => (
                      <Stack key={feat} direction="row" spacing={1.5} alignItems="center">
                        <Avatar sx={{ width: 22, height: 22, bgcolor: "secondary.main", fontSize: "0.75rem", color: "primary.main" }}>✓</Avatar>
                        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.9)" }}>{feat}</Typography>
                      </Stack>
                    ))}
                  </Stack>
                </Stack>
              </Paper>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 2. Trusted By Banner */}
      <Box sx={{ borderBottom: "1px solid", borderColor: "divider", py: 3.5, bgcolor: "white" }}>
        <Container maxWidth="lg">
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={{ xs: 2, sm: 5 }}
            justifyContent="center"
            alignItems="center"
            sx={{ opacity: 0.6 }}
          >
            <Typography variant="subtitle2" color="text.secondary" fontWeight="bold">
              FAITES CONFIANCE A :
            </Typography>
            <Stack direction="row" spacing={4} flexWrap="wrap" justifyContent="center" alignItems="center">
              {trustedBrands.map((brand) => (
                <Typography
                  key={brand}
                  variant="h5"
                  fontWeight="bold"
                  sx={{
                    fontStyle: "italic",
                    fontFamily: "monospace",
                    letterSpacing: 1.5,
                    color: "text.primary"
                  }}
                >
                  {brand}
                </Typography>
              ))}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* 3. Operational Quick Stats */}
      <Container maxWidth="lg" sx={{ mt: 5, mb: 6 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Catalogue marketplace" value="48 Services" helper="Commandes pretes a lancer" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Workflow operationnel" value="Devis -> Projet" helper="Trabilite complete" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Support temps reel" value="Messagerie" helper="SignalR chat connecte" />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard label="Roles Securises" value="Client / Dev / Mgr" helper="Controle d'acces strict" />
          </Grid>
        </Grid>
      </Container>

      {/* 4. Beautiful Visual Categories Grid */}
      <Box sx={{ py: 6, bgcolor: "#f8f9fc" }}>
        <Container maxWidth="lg">
          <Box sx={{ mb: 4, textAlign: "left" }}>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, letterSpacing: -0.5 }}>
              Decouvrez nos categories populaires
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Des experts prets a repondre a tous vos besoins d'infrastructure, de code et de design.
            </Typography>
          </Box>

          <Grid container spacing={3}>
            {categoriesList.map((cat) => (
              <Grid item xs={12} sm={6} md={4} key={cat.name}>
                <Card
                  sx={{
                    height: 220,
                    position: "relative",
                    borderRadius: 3,
                    cursor: "pointer",
                    overflow: "hidden",
                    boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
                    transition: "transform 0.3s ease, box-shadow 0.3s ease",
                    "&:hover": {
                      transform: "translateY(-6px)",
                      boxShadow: "0 12px 24px rgba(0,0,0,0.15)"
                    }
                  }}
                  onClick={() => {
                    setQuery(cat.name);
                    if (token) {
                      navigate(`/services?q=${encodeURIComponent(cat.name)}`);
                    } else {
                      navigate("/signup");
                    }
                  }}
                >
                  <Box
                    sx={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: `url(${cat.image})`,
                      backgroundSize: "cover",
                      backgroundPosition: "center",
                      filter: "brightness(0.55)"
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 0,
                      left: 0,
                      p: 3,
                      color: "white"
                    }}
                  >
                    <Typography variant="caption" sx={{ color: "secondary.main", fontWeight: "bold" }}>
                      PRO SERVICE
                    </Typography>
                    <Typography variant="h5" fontWeight="bold" sx={{ mb: 0.5 }}>
                      {cat.name}
                    </Typography>
                    <Typography variant="body2" sx={{ opacity: 0.85 }}>
                      {cat.subtitle}
                    </Typography>
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* 5. TunUpLancer Pro Services Grid */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 4 }}>
          <Box>
            <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, letterSpacing: -0.5 }}>
              Services Pro les plus vendus
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Des packages cles en main concus et livres par nos meilleurs developpeurs et administrateurs.
            </Typography>
          </Box>
          <Button
            component={Link}
            to={token ? "/services" : "/signup"}
            variant="outlined"
            size="large"
            sx={{
              borderRadius: 3,
              fontWeight: "bold",
              borderColor: "primary.main",
              color: "primary.main",
              "&:hover": {
                borderColor: "primary.dark",
                bgcolor: "rgba(15, 61, 62, 0.05)"
              }
            }}
          >
            Voir tout le catalogue
          </Button>
        </Stack>

        <Grid container spacing={3}>
          {marketplaceServices.map((service) => (
            <Grid item xs={12} sm={6} md={3} key={service.title}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                  borderRadius: 3.5,
                  overflow: "hidden",
                  boxShadow: "0 4px 12px rgba(0,0,0,0.04)",
                  border: "1px solid",
                  borderColor: "grey.200",
                  transition: "transform 0.3s ease, box-shadow 0.3s ease",
                  "&:hover": {
                    transform: "translateY(-6px)",
                    boxShadow: "0 12px 24px rgba(0,0,0,0.12)"
                  }
                }}
              >
                <Box sx={{ position: "relative", overflow: "hidden", pt: "60%" }}>
                  <CardMedia
                    component="img"
                    image={service.image}
                    alt={service.title}
                    sx={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transition: "transform 0.5s ease",
                      "&:hover": {
                        transform: "scale(1.08)"
                      }
                    }}
                  />
                  <Chip
                    label="TunUpLancer PRO"
                    size="small"
                    sx={{
                      position: "absolute",
                      top: 12,
                      left: 12,
                      bgcolor: "primary.main",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: "0.65rem",
                      height: 20
                    }}
                  />
                </Box>
                <CardContent sx={{ flexGrow: 1, display: "flex", flexDirection: "column", p: 2.5 }}>
                  {/* Seller Header */}
                  <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 1.5 }}>
                    <Avatar sx={{ width: 28, height: 28, bgcolor: "primary.main", fontSize: "0.8rem", fontWeight: "bold" }}>
                      {service.seller.slice(0, 1)}
                    </Avatar>
                    <Box>
                      <Typography variant="body2" fontWeight="bold" sx={{ fontSize: "0.85rem" }}>
                        {service.seller}
                      </Typography>
                      <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: -0.3 }}>
                        {service.role}
                      </Typography>
                    </Box>
                  </Stack>

                  {/* Title */}
                  <Typography
                    variant="body1"
                    fontWeight="bold"
                    sx={{
                      minHeight: 48,
                      lineHeight: 1.35,
                      mb: 2,
                      display: "-webkit-box",
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      cursor: "pointer",
                      "&:hover": {
                        color: "secondary.main"
                      }
                    }}
                  >
                    {service.title}
                  </Typography>

                  {/* Rating */}
                  <Stack direction="row" spacing={0.5} alignItems="center" sx={{ mb: 2 }}>
                    <span style={{ color: "#faaf00", fontSize: "1.1rem" }}>★</span>
                    <Typography variant="body2" fontWeight="bold">
                      {service.rating}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      ({service.reviewsCount})
                    </Typography>
                  </Stack>

                  <Divider sx={{ my: 1.5 }} />

                  {/* Pricing Footer */}
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: "bold", textTransform: "uppercase" }}>
                      A PARTIR DE
                    </Typography>
                    <Typography variant="h6" fontWeight="extrabold" color="primary.main">
                      {service.price} €
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 6. High-End Value Prop Section (TunUpLancer Business Style) */}
      <Box
        sx={{
          bgcolor: "primary.main",
          color: "white",
          py: { xs: 8, md: 10 },
          px: 3,
          borderTop: "4px solid",
          borderTopColor: "secondary.main"
        }}
      >
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="overline" sx={{ color: "secondary.main", fontWeight: "bold", letterSpacing: 1.5 }}>
                MARKETPLACE COLLABORATIVE
              </Typography>
              <Typography variant="h3" fontWeight="bold" sx={{ mb: 3.5, fontSize: { xs: "1.8rem", md: "2.5rem" } }}>
                Un concentre de talents et d'outils de pilotage a portee de main
              </Typography>

              <Stack spacing={3}>
                {[
                  {
                    title: "Le meilleur pour chaque budget",
                    desc: "Trouvez des services de developpement et de gestion a prix fixes ou sous forme de devis personnalises. Pas de mauvaise surprise."
                  },
                  {
                    title: "Travail de qualite et rapide",
                    desc: "Validez des livrables de qualite testes par vos developpeurs et approuves par vos managers."
                  },
                  {
                    title: "Paiements securises et proteges",
                    desc: "Les fonds ne sont transferes aux developpeurs que lorsque vous approuvez le livrable du projet ou de la tache."
                  },
                  {
                    title: "Support technique disponible 24/7",
                    desc: "Notre support client et notre module de tickets integres garantissent une resolution rapide de tous vos bugs."
                  }
                ].map((item) => (
                  <Stack key={item.title} direction="row" spacing={2} alignItems="flex-start">
                    <Avatar
                      sx={{
                        width: 28,
                        height: 28,
                        bgcolor: "secondary.main",
                        color: "primary.main",
                        fontWeight: "bold",
                        fontSize: "0.95rem",
                        mt: 0.3
                      }}
                    >
                      ✓
                    </Avatar>
                    <Box>
                      <Typography variant="subtitle1" fontWeight="bold" sx={{ color: "white" }}>
                        {item.title}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.75)", mt: 0.5 }}>
                        {item.desc}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </Grid>

            {/* Visual collage on right */}
            <Grid item xs={12} md={6}>
              <Box sx={{ position: "relative" }}>
                <Box
                  component="img"
                  src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80"
                  alt="Team collaboration"
                  sx={{
                    width: "100%",
                    borderRadius: 4,
                    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
                    border: "1px solid rgba(255,255,255,0.15)"
                  }}
                />
                {/* Floating operational card */}
                <Paper
                  elevation={6}
                  sx={{
                    position: "absolute",
                    bottom: -20,
                    right: -20,
                    p: 2.5,
                    borderRadius: 3,
                    display: { xs: "none", sm: "flex" },
                    alignItems: "center",
                    spacing: 2,
                    bgcolor: "white",
                    color: "text.primary",
                    maxWidth: 240,
                    borderLeft: "5px solid",
                    borderLeftColor: "secondary.main"
                  }}
                >
                  <Stack spacing={1}>
                    <Typography variant="caption" fontWeight="bold" color="secondary.main">
                      PROJET LIVRE
                    </Typography>
                    <Typography variant="body2" fontWeight="extrabold">
                      Site ERP Premium
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Statut: Complete avec succes
                    </Typography>
                  </Stack>
                </Paper>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* 7. Walkthrough Steps by Role */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Box sx={{ textAlign: "center", mb: 6 }}>
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1, letterSpacing: -0.5 }}>
            Un parcours adapte a chaque acteur
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ maxWidth: 600, mx: "auto" }}>
            Que vous soyez Client, Developpeur, Manager ou Administrateur, notre logique full-stack complete repond a vos besoins.
          </Typography>
        </Box>

        <Grid container spacing={3}>
          {[
            {
              role: "Client",
              color: "primary.main",
              steps: [
                "Recherche de services pro prets a l'emploi",
                "Creation de demandes de devis sur-mesure",
                "Validation des devis et suivi des paiements",
                "Messagerie instantanee avec l'equipe technique"
              ]
            },
            {
              role: "Developpeur",
              color: "secondary.main",
              steps: [
                "Acces a la liste des tâches affectees",
                "Progression des taches (To Do -> Done)",
                "Partage et mise a jour des documents du projet",
                "Chat direct pour coordination technique"
              ]
            },
            {
              role: "Manager",
              color: "info.main",
              steps: [
                "Gestion des clients et des equipes",
                "Creation de devis a partir des demandes clients",
                "Validation budgetaire et suivi des factures",
                "Supervision des workflows operationnels"
              ]
            },
            {
              role: "Admin",
              color: "success.main",
              steps: [
                "Controle total des utilisateurs et des roles",
                "Supervision de l'Audit Log de securite",
                "Configuration globale de la plateforme",
                "Statistiques d'activite detaillees"
              ]
            }
          ].map((item) => (
            <Grid item xs={12} sm={6} md={3} key={item.role}>
              <Paper
                elevation={2}
                sx={{
                  p: 3,
                  height: "100%",
                  borderRadius: 3,
                  border: "1px solid",
                  borderColor: "grey.100",
                  transition: "transform 0.3s ease",
                  "&:hover": {
                    transform: "scale(1.03)"
                  }
                }}
              >
                <Chip
                  label={item.role}
                  sx={{
                    mb: 2,
                    fontWeight: "bold",
                    bgcolor: item.color,
                    color: item.role === "Developpeur" ? "primary.main" : "white"
                  }}
                />
                <Stack spacing={2} sx={{ mt: 1 }}>
                  {item.steps.map((step, idx) => (
                    <Stack key={step} direction="row" spacing={1.5} alignItems="flex-start">
                      <Avatar
                        sx={{
                          width: 20,
                          height: 20,
                          bgcolor: "grey.100",
                          color: "text.primary",
                          fontSize: "0.75rem",
                          fontWeight: "bold"
                        }}
                      >
                        {idx + 1}
                      </Avatar>
                      <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.3 }}>
                        {step}
                      </Typography>
                    </Stack>
                  ))}
                </Stack>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default HomePage;
