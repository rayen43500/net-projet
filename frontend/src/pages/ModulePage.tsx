import { Box, Button, Card, CardContent, Pagination, Stack, TextField, Typography } from "@mui/material";
import DataTable from "../components/DataTable";

type ModulePageProps = {
  title: string;
  description?: string;
  actions?: string[];
  searchPlaceholder?: string;
  columns: string[];
  rows: Array<string[]>;
};

const ModulePage = ({
  title,
  description,
  actions = ["Ajouter", "Exporter", "Actualiser"],
  searchPlaceholder = "Rechercher...",
  columns,
  rows
}: ModulePageProps) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 1 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
          {description}
        </Typography>
      ) : null}
      <Card>
        <CardContent>
          <Stack direction={{ xs: "column", md: "row" }} spacing={2} sx={{ mb: 2 }}>
            <Stack direction="row" spacing={1} flexWrap="wrap">
              {actions.map((action) => (
                <Button key={action} variant="outlined">
                  {action}
                </Button>
              ))}
            </Stack>
            <Box sx={{ flex: 1 }} />
            <TextField size="small" placeholder={searchPlaceholder} />
          </Stack>
          <DataTable columns={columns} rows={rows} />
          <Stack direction="row" justifyContent="flex-end" sx={{ mt: 2 }}>
            <Pagination count={3} color="primary" />
          </Stack>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModulePage;
