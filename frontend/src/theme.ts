import { createTheme } from "@mui/material/styles";

export const getTheme = (mode: "light" | "dark") =>
  createTheme({
    palette: {
      mode,
      primary: {
        main: "#0f3d3e"
      },
      secondary: {
        main: "#f2a154"
      },
      background: {
        default: mode === "dark" ? "#0f1216" : "#f6f7fb",
        paper: mode === "dark" ? "#151a21" : "#ffffff"
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
