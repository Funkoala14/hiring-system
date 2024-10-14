import React from 'react';
import Header from '/components/Header/Header';
// import Footer from '../Footer/Footer';
import './MainLayout.scss';

function MainLayout({ children }) {
    return (
        <div className='main-container'>
            <Header />
            <main className='container'>{children}</main>
            {/* <Footer /> */}
        </div>
    );
}

export default MainLayout;
