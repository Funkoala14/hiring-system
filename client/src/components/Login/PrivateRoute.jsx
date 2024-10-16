import React, { Children } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ Children }) => {
    const { isLoggedIn } = useSelector((state) => state.auth);

    if (!isLoggedIn) {
        return <Navigate to ="/login"/>
    }

    return children;

};

export default PrivateRoute;