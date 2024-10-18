import AppRouter from "./router"; // Assuming this provides your routing logic
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import useAuthInit from "./hooks/useAuthInit";

const theme = createTheme({
  palette: {
    primary: {
      main: "#ff5733", // Primary color (red)
    },
    secondary: {
      main: "#dc004e", // Secondary color
    },
  },
});

function App() {
  useAuthInit();
  
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This will apply Material-UI's baseline styles */}
      <AppRouter></AppRouter>
    </ThemeProvider>
  );
}

export default App;
