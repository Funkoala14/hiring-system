import React, { Suspense, lazy } from "react";
import { Routes, Route, Outlet } from "react-router-dom";
import MainLayout from "/layouts/MainLayout";
import HRVisaStatus from "./pages/HRVisaStatus/HRVisaStatus";

const RegistrationPage = lazy(() => import("/pages/Registration/Registration"));
const Home = lazy(() => import("/pages/Home/Home"));
const SendLink = lazy(() => import("/pages/Registration/SendRegistration"));
const Profile = lazy(() => import("/pages/Profile/Profile"));
const Login = lazy(() => import("/pages/Home/Login"));
const Dashboard = lazy(() => import("/pages/Home/Dashboard"));
const NotFound = lazy(() => import("/pages/Home/NotFound"));
const PrivateRoute = lazy(() => import("./components/PrivateRoute"));
const OnboardingStatus = lazy(() => import("./components/OnboardingStatus"));
const Forbidden = lazy(() => import("./pages/Home/Forbidden"));
const OnBoarding = lazy(() => import("./pages/OnBoarding"));
const EmployeeManagement = lazy(() =>
  import("./pages/EmployeeManagement/EmployeeManagement")
);
const HousingManagement = lazy(() =>
  import("./pages/HousingManagement/HousingManagement")
);
const HousingView = lazy(() => import("./pages/HousingView/HousingView"));
const ApplicationTables = lazy(() =>
  import("./pages/ViewOnboardingApplications")
);
const ApplicationDetails = lazy(() => import("./pages/ApplicationDetails"));
const VisaStatus = lazy(() => import("./pages/VisaStatus/VisaStatus"));

function AppRouter() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Home Route */}
        <Route
          path="/"
          element={
            <MainLayout>
              <Home />
            </MainLayout>
          }
        />

        {/* RegistrationPage Route */}
        <Route path="/register" element={<RegistrationPage />} />

        {/* Login Route */}
        <Route path="/login" element={<Login />} />

        {/* Employee Routes */}
        <Route
          path="employee"
          element={
            <PrivateRoute allowedRoles={["Employee"]}>
              <Outlet /> {/* Outlet to render nested routes */}
            </PrivateRoute>
          }
        >
          {/* On-Boarding Route (without Header and Navbar) */}

          <Route path="on-boarding" element={<OnBoarding />} />

          {/* Confirmation Route */}
          <Route
            path="on-boarding/confirmation"
            element={<Confirmation parent={"on-boarding"} />}
          />
          {/* Employee Personal Info Route (with MainLayout) */}
          <Route
            path="my-profile"
            element={
              <MainLayout>
                <Profile parent={"employee"} />
              </MainLayout>
            }
          />
          <Route
            path="housing-detail"
            element={
              <MainLayout>
                <HousingView parent="employee" />
              </MainLayout>
            }
          />

          {/* On-Boarding Route (without Header and Navbar) */}

          <Route path="on-boarding" element={<OnBoarding/>} /> 

          {/* Confirmation Route */}
          <Route
            path="on-boarding/confirmation"
            element={<Confirmation parent={"on-boarding"} />}
          />
 

          {/* Visa-Status Route */}
          <Route
            path="visa-status"
            element={
              <MainLayout>
                <VisaStatus />
              </MainLayout>
            }
          />
        </Route>

        {/* HR Dashboard Route (Protected) */}
        <Route
          path="hr"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <Outlet />
            </PrivateRoute>
          }
        >
          <Route
            path="dashboard"
            element={
              <MainLayout>
                <Dashboard />
              </MainLayout>
            }
          />
          {/* SendLink Route */}
          <Route
            path="contact"
            element={
              <MainLayout>
                <SendLink />
              </MainLayout>
            }
          />
          <Route
            path="employee-management"
            element={
              <MainLayout>
                <EmployeeManagement />
              </MainLayout>
            }
          />
          <Route
            path="employee-profile"
            element={
              <MainLayout>
                <Profile parent={"hr"} />
              </MainLayout>
            }
          />
          <Route
            path="housing-management"
            element={
              <MainLayout>
                <HousingManagement />
              </MainLayout>
            }
          />
          <Route
            path="housing-detail"
            element={
              <MainLayout>
                <HousingView parent="hr" />
              </MainLayout>
            }
          />
          <Route
            path="visa-status"
            element={
              <MainLayout>
                <HRVisaStatus parent="hr" />
              </MainLayout>
            }
          />

          {/* Review Applications Route */}
          <Route
            path="onboarding-review"
            element={
              <MainLayout>
                <ApplicationTables />
              </MainLayout>
            }
          />
          <Route
            path="application/:id"
            element={
              <MainLayout>
                <ApplicationDetails />
              </MainLayout>
            }
          />
        </Route>

        {/* Forbidden Route */}
        <Route
          path="forbidden"
          element={
            <MainLayout>
              <Forbidden />
            </MainLayout>
          }
        />

        {/* Catch-all route for undefined paths */}
        <Route
          path="*"
          element={
            <MainLayout>
              <NotFound />
            </MainLayout>
          }
        />
      </Routes>
    </Suspense>
  );
}

export default AppRouter;
