import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectIsLoggedIn } from '../../store/auth/auth.selector';
import { Breadcrumbs, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const Forbidden = () => {
    const dispatch = useDispatch();
    const { isLoggedIn,} = useSelector(selectIsLoggedIn);  // Get isLoggedIn and role from state
    
    if (!isLoggedIn) {
        if (!token) {
          return <Navigate to='/login' />;  // Redirect to login if no token is found
        }
        // Dispatch verifyThunk to validate the token
        dispatch(verifyThunk());
    }

    const handleGoBack = () => {
        navigate(-1);
    };
    
    return (
        <div>
            <Breadcrumbs aria-label='breadcrumb' sx={{ margin: '16px 0' }}>
                    <Link underline='hover' color='inherit' onClick={handleGoBack} sx={{ cursor: 'pointer' }}>
                        Go Back
                    </Link>
                    <Typography sx={{ color: 'text.primary' }}>No permission</Typography>
                </Breadcrumbs>
            <h1>403 - Forbidden</h1>
            <p>You do not have permission to view this page.</p>
        </div>
    );
};

export default Forbidden;
