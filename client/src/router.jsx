// src/router.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';
import Profile from './pages/Profile/Profile';

const Home = lazy(() => import('/pages/Home/Home'));

function AppRouter() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/my-profile' element={<Profile />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
}

export default AppRouter;
