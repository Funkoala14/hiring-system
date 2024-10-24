import React, { useEffect, useState } from 'react';
import './Home.scss';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/auth/auth.selector';

function Home() {
    const { isLoggedIn, role, error, token } = useSelector(selectIsLoggedIn);
    const navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            if (role === 'HR') {
                navigate('/hr/dashboard'); // HR redirect
            } else {
                navigate('/employee/on-boarding'); // Employee redirect
            }
        }
    }, [isLoggedIn, role]);

    return (
        <div className='Home'>
            <h1>Welcome to MyApp</h1>
            <p>This is the home page.</p>
            <Link to='/contact'>
                <button>Go to Send Registration Link</button>
            </Link>
        </div>
    );
}

export default Home;
