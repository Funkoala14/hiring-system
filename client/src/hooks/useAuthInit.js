import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { verifyThunk } from '../store/auth/auth.thunk.js';
import { useParams } from 'react-router-dom';

const useAuthInit = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true);
    const { token } = useParams();

    useEffect(() => {
        const initializeAuth = async () => {
            // On/Off useAuthInit
            await dispatch(verifyThunk());
            setIsLoading(false);
        };

        if (window.location.pathname !== '/register') {
            initializeAuth();
        } else {
            setIsLoading(false);
        }

    }, [dispatch]);

    return { isLoading };
};

export default useAuthInit;
