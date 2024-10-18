// src/router.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';
import VisaStatus from './pages/VisaStatus/VisaStatus';

const Home = lazy(() => import('/pages/Home/Home'));

function AppRouter() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/visa-status' element={<VisaStatus />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
}

export default AppRouter;
