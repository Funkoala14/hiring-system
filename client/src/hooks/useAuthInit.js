import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { verifyThunk } from "../store/auth/auth.thunk.js";
import { resetAuth } from "../store/auth/auth.slice.js";

const useAuthInit = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        const token = Cookies.get("token");
		
        if (token) {
            const userData = { token };
            dispatch(verifyThunk(userData));
        } else {
			dispatch(resetAuth());
		}
    }, [dispatch]);
};

export default useAuthInit;
