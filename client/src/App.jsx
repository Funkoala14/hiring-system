import AppRouter from "./router"; // Assuming this provides your routing logic
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import useAuthInit from "./hooks/useAuthInit";
import { NotificationSnackbar } from "./components/NotificationSnackBar/NotificationSnackBar";
import Loading from "./components/Loading";

const theme = createTheme({
  palette: {
    primary: {
      main: "#607d8b", // Primary color (red)
    },
    secondary: {
      main: "#6ba5c1", // Secondary color
    },
  },
});
function App() {
  const { isLoading } = useAuthInit();

  if (isLoading) {
    return <Loading />
  }
  
  return (
    <ThemeProvider theme={theme}>
      <NotificationSnackbar/>
      <CssBaseline /> {/* This will apply Material-UI's baseline styles */}
      <AppRouter></AppRouter>
    </ThemeProvider>
  );
}

export default App;
