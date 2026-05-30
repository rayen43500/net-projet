import { Box, Grid, LinearProgress, Typography } from "@mui/material";
import StatCard from "../components/StatCard";
import DataTable from "../components/DataTable";

const AdvancedStats = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Statistiques avancees
      </Typography>
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={4}>
          <StatCard label="Revenus mensuels" value="48k" helper="+12% vs mois dernier" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Projets en retard" value={5} helper="2 critiques" />
        </Grid>
        <Grid item xs={12} md={4}>
          <StatCard label="Tickets urgents" value={3} helper="SLA 24h" />
        </Grid>
      </Grid>
      <Typography variant="h6" sx={{ mb: 1 }}>
        Performance equipe
      </Typography>
      <LinearProgress variant="determinate" value={72} sx={{ mb: 3 }} />
      <DataTable
        columns={["Equipe", "Taches livrees", "Taux", "Charge"]}
        rows={[
          ["Team Alpha", "42", "86%", "Moyenne"],
          ["Team Beta", "30", "78%", "Elevee"],
          ["Team Gamma", "25", "64%", "Faible"]
        ]}
      />
    </Box>
  );
};

export default AdvancedStats;
