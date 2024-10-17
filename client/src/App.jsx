import AppRouter from "./router"; // Assuming this provides your routing logic
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import React from "react";
import {
  useNavigate,
  Outlet,
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom"; // Import Outlet to render child routes
import Button from "@mui/material/Button"; // Example usage of Material-UI Button
import Home from "./pages/Home/Home";
import Login from "./pages/Home/Login";
import Dashboard from "./pages/Home/Dashboard";
import EmployeeInfo from "./pages/Home/EmployeeInfo";
import NotFound from "./pages/Home/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Forbidden from "./pages/Home/Forbidden";

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

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* This will apply Material-UI's baseline styles */}
      <BrowserRouter>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* Login Route */}
          <Route path="login" element={<Login />} />

          {/* HR Dashboard Route (Protected) */}
          <Route
            path="hr/dashboard"
            element={
              <PrivateRoute allowedRoles={["HR"]}>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Employee Personal Info Route (Protected) */}
          <Route
            path="employee/personal-info"
            element={
              <PrivateRoute allowedRoles={["Employee"]}>
                <EmployeeInfo />
              </PrivateRoute>
            }
          />

          {/* Forbidden Route */}
          <Route path="forbidden" element={<Forbidden />} />

          {/* Catch-all route for undefined paths */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      
    </ThemeProvider>
  );
}

export default App;
