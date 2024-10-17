// src/router.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';
import { SendLink } from './pages/Registration/SendRegistration';

const Home = lazy(() => import('/pages/Home/Home'));
const RegistrationPage = lazy(() => import('/pages/Registration/Registration'));


function AppRouter() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path="/contact" element={<SendLink />} />
                    <Route path="/register" element={<RegistrationPage />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
}

export default AppRouter;
