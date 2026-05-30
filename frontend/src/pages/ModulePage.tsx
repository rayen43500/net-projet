import { Box, Card, CardContent, Typography } from "@mui/material";

type ModulePageProps = {
  title: string;
  description: string;
};

const ModulePage = ({ title, description }: ModulePageProps) => {
  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 2 }}>
        {title}
      </Typography>
      <Card>
        <CardContent>
          <Typography variant="body1" sx={{ mb: 1 }}>
            {description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            This module is ready for API integration and UI refinement.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
};

export default ModulePage;
