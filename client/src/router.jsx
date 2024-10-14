// src/router.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';

const Home = lazy(() => import('/pages/Home/Home'));

function AppRouter() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
}

export default AppRouter;
