import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { verifyThunk } from "../store/auth/auth.thunk.js";

const useAuthInit = () => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        const initializeAuth = async () => {
            // On/Off useAuthInit
            //await dispatch(verifyThunk());
            setIsLoading(false); 
        };

        initializeAuth();
    }, [dispatch]);

    return { isLoading };
};

export default useAuthInit;
