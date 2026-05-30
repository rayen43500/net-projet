import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

const stats = [
  { label: "Clients", value: "128" },
  { label: "Projets", value: "42" },
  { label: "Tickets", value: "16" },
  { label: "Revenus", value: "98k" }
];

const Dashboard = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Tableau de bord
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <StatCard label={stat.label} value={stat.value} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" spacing={2}>
        <Button component={Link} to="/stats" variant="outlined">
          Voir statistiques avancees
        </Button>
      </Stack>
      <Grid container spacing={3} sx={{ mt: 1 }}>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Etat des projets
          </Typography>
          <DataTable
            columns={["Projet", "Statut"]}
            rows={[["Site vitrine", "Active"], ["Mobile App", "On Hold"]]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Factures en attente
          </Typography>
          <DataTable
            columns={["Numero", "Client", "Montant"]}
            rows={[["INV-2026-01", "Alpha Corp", "12000"]]}
          />
        </Grid>
        <Grid item xs={12} md={4}>
          <Typography variant="h6" sx={{ mb: 1 }}>
            Tickets ouverts
          </Typography>
          <DataTable
            columns={["Sujet", "Priorite"]}
            rows={[["Bug login", "Urgent"], ["Erreur 500", "Moyenne"]]}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
