import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';
import { SendLink } from './pages/Registration/SendRegistration';
import Login from "./pages/Home/Login";
import Dashboard from "./pages/Home/Dashboard";
import EmployeeInfo from "./pages/Home/EmployeeInfo";
import NotFound from "./pages/Home/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import Forbidden from "./pages/Home/Forbidden";
import OnBoarding from "./pages/OnBoarding";
import Profile from './pages/Profile/Profile';
import ApplicationTables from './pages/ViewOnboardingApplications';
import ApplicationDetails from './pages/ApplicationDetails';



const RegistrationPage = lazy(() => import('/pages/Registration/Registration'));


const Home = lazy(() => import('/pages/Home/Home'));

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Home Route */}
        <Route path="/" element={<MainLayout><Home /></MainLayout>} />

        {/* SendLink Route */}
        <Route path="/contact" element={<MainLayout><SendLink /></MainLayout>} />

        {/* RegistrationPage Route */}
        <Route path="/register" element={<MainLayout><RegistrationPage /></MainLayout>} />

        {/* Review Applications Route */}
        <Route path="/onboarding-review" element={<MainLayout><ApplicationTables /></MainLayout>} />
        <Route path="/application/:id" element={<MainLayout><ApplicationDetails /></MainLayout>} /> 

        {/* Login Route */}
        <Route path="login" element={<Login />} />

        {/* Employee Routes */}
        <Route
          path="employee"
          element={
            <PrivateRoute allowedRoles={["Employee"]}>
              <Outlet /> {/* Outlet to render nested routes */}
            </PrivateRoute>
          }
        >
          {/* Employee Personal Info Route (with MainLayout) */}
          <Route
            path="my-profile"
            element={
              <MainLayout>
                <Profile />
              </MainLayout>
            }
          />

          {/* On-Boarding Route (without Header and Navbar) */}
          <Route path="on-boarding" element={<OnBoarding />} />
        </Route>

        {/* HR Dashboard Route (Protected) */}
        <Route
          path="hr/dashboard"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </PrivateRoute>
          }
        />

        {/* Forbidden Route */}
        <Route path="forbidden" element={<MainLayout><Forbidden /></MainLayout>} />

        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
