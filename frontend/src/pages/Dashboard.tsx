import { Box, Card, CardContent, Grid, Typography } from "@mui/material";

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
      <Grid container spacing={3}>
        {stats.map((stat) => (
          <Grid item xs={12} sm={6} md={3} key={stat.label}>
            <Card>
              <CardContent>
                <Typography variant="overline" color="text.secondary">
                  {stat.label}
                </Typography>
                <Typography variant="h5">{stat.value}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Dashboard;
