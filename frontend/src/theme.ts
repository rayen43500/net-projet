import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light",
    primary: {
      main: "#0f3d3e"
    },
    secondary: {
      main: "#f2a154"
    }
  },
  typography: {
    fontFamily: "'DM Sans', 'Segoe UI', sans-serif",
    h3: {
      fontFamily: "'Playfair Display', 'DM Sans', serif"
    },
    h4: {
      fontFamily: "'Playfair Display', 'DM Sans', serif"
    }
  },
  shape: {
    borderRadius: 12
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 16
        }
      }
    }
  }
});
