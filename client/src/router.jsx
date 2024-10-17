// src/router.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';
import { SendLink } from './pages/Registration/SendRegistration';
import Login from "./pages/Home/Login";
import Dashboard from "./pages/Home/Dashboard";
import EmployeeInfo from "./pages/Home/EmployeeInfo";
import NotFound from "./pages/Home/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Forbidden from "./pages/Home/Forbidden";

const Home = lazy(() => import("/pages/Home/Home"));
const RegistrationPage = lazy(() => import('/pages/Registration/Registration'));


function AppRouter() {
  return (
    <MainLayout>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Home Route */}
          <Route path="/" element={<Home />} />

          {/* SendLink Route */}
          <Route path="/contact" element={<SendLink />} />

          {/* RegistrationPage Route */}
          <Route path="/register" element={<RegistrationPage />} />

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
      </Suspense>
    </MainLayout>
  );
}

export default AppRouter;
