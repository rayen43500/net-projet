import { Box, Card, CardContent, Stack, TextField, Typography } from "@mui/material";

const results = [
  { label: "Projet Website", type: "Project" },
  { label: "Client Alpha Corp", type: "Client" },
  { label: "Ticket Login", type: "Ticket" },
  { label: "Facture INV-2026-01", type: "Invoice" }
];

const Search = () => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        Recherche globale
      </Typography>
      <TextField fullWidth placeholder="Rechercher un client, projet, ticket..." sx={{ mb: 3 }} />
      <Stack spacing={2}>
        {results.map((item) => (
          <Card key={item.label} variant="outlined">
            <CardContent>
              <Typography variant="subtitle1">{item.label}</Typography>
              <Typography variant="caption" color="text.secondary">
                {item.type}
              </Typography>
            </CardContent>
          </Card>
        ))}
      </Stack>
    </Box>
  );
};

export default Search;
