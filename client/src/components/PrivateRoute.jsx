import { useSelector, useDispatch } from "react-redux";
import { verifyThunk } from "../store/auth/auth.thunk";
import { selectIsLoggedIn, selectIsLoading } from "../store/auth/auth.selector";
import { Navigate } from "react-router-dom";

const PrivateRoute = ({ children, allowedRoles }) => {
	const dispatch = useDispatch();
	const { isLoggedIn, role, token } = useSelector(selectIsLoggedIn); // Get isLoggedIn and role from state
	const { isLoading } = useSelector(selectIsLoading);

	if (!isLoggedIn) {
		if (!token) {
			return <Navigate to="/login" />; // Redirect to login if no token is found
		}
		// Dispatch verifyThunk to validate the token
		dispatch(verifyThunk());
	}

	if (isLoading) {
		return <div>Loading...</div>;
	}

	// If logged in, but role is not allowed, redirect to a 403 or home page
	if (!allowedRoles.includes(role)) {
		return <Navigate to="/forbidden" replace />;
	}

	// If logged in and role is allowed, render the children
	return children;
};

export default PrivateRoute;
