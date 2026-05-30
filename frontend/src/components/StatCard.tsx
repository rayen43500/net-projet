import { Card, CardContent, Typography } from "@mui/material";

type StatCardProps = {
  label: string;
  value: string | number;
  helper?: string;
};

const StatCard = ({ label, value, helper }: StatCardProps) => {
  return (
    <Card variant="outlined">
      <CardContent>
        <Typography variant="overline" color="text.secondary">
          {label}
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: 600 }}>
          {value}
        </Typography>
        {helper ? (
          <Typography variant="body2" color="text.secondary">
            {helper}
          </Typography>
        ) : null}
      </CardContent>
    </Card>
  );
};

export default StatCard;
