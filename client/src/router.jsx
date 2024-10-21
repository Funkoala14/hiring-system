import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';
import VisaStatus from './pages/VisaStatus/VisaStatus';
import { SendLink } from './pages/Registration/SendRegistration';
import Login from "./pages/Home/Login";
import Dashboard from "./pages/Home/Dashboard";
import NotFound from "./pages/Home/NotFound";
import PrivateRoute from "./components/PrivateRoute";
import OnboardingStatus from "./components/OnboardingStatus";
import Forbidden from "./pages/Home/Forbidden";
import OnBoarding from "./pages/OnBoarding";
import Profile from './pages/Profile/Profile';
import EmployeeManagement from './pages/EmployeeManagement/EmployeeManagement';
import HousingManagement from './pages/HousingManagement/HousingManagement';
import HousingView from './pages/HousingView/HousingView';

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

          {/* Employee Details Route (for onboarding status check) */}
          <Route
            path="details"
            element={<OnboardingStatus />}  // OnboardingStatus will handle the redirect logic
          />
          {/* Employee Personal Info Route (with MainLayout) */}
          <Route
            path="my-profile"
            element={
              <MainLayout>
                <Profile parent={"employee"}/>
              </MainLayout>
            }
          />

                    {/* On-Boarding Route (without Header and Navbar) */}
                    <Route path="on-boarding" element={<OnBoarding />} />

                    {/* Visa-Status Route */}
                    <Route path='visa-status' element={<MainLayout>
                        <VisaStatus />
                    </MainLayout>} />
                </Route>
                                                       
   {/* HR Dashboard Route (Protected) */}
        <Route
          path="hr"
          element={
            <PrivateRoute allowedRoles={["HR"]}>
              <Outlet/>
            </PrivateRoute>
          }
        >
          <Route path='dashboard' element={<MainLayout><Dashboard /></MainLayout>}/>
          <Route path='employee-management' element={<MainLayout><EmployeeManagement /></MainLayout>}/>
          <Route path='employee-profile' element={<MainLayout><Profile parent={"hr"}/></MainLayout>}/>
          <Route path='housing-mangement' element={<MainLayout><HousingManagement /></MainLayout>}/>
          <Route path='housing-detail' element={<MainLayout><HousingView /></MainLayout>}/>
        </Route>

                {/* Forbidden Route */}
                <Route path="forbidden" element={<MainLayout><Forbidden /></MainLayout>} />

                {/* Catch-all route for undefined paths */}
                <Route path="*" element={<MainLayout><NotFound /></MainLayout>} />
            </Routes>
        </Suspense>
    );
}

export default AppRouter;
