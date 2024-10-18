// src/router.jsx
import React, { Suspense, lazy } from 'react';
import { Routes, Route } from 'react-router-dom';
import MainLayout from '/layouts/MainLayout';
import PersonalInfo from './pages/PersonalInfo/PersonalInfo';

const Home = lazy(() => import('/pages/Home/Home'));

function AppRouter() {
    return (
        <MainLayout>
            <Suspense fallback={<div>Loading...</div>}>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/personal-info' element={<PersonalInfo />} />
                </Routes>
            </Suspense>
        </MainLayout>
    );
}

export default AppRouter;
