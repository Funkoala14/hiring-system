import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../store/auth/auth.selector";

const Forbidden = () => {
	const dispatch = useDispatch();
	const { isLoggedIn } = useSelector(selectIsLoggedIn); // Get isLoggedIn and role from state

	if (!isLoggedIn) {
		if (!token) {
			return <Navigate to="/login" />; // Redirect to login if no token is found
		}
		// Dispatch verifyThunk to validate the token
		dispatch(verifyThunk());
	}

	return (
		<div>
			<h1>403 - Forbidden</h1>
			<p>You do not have permission to view this page.</p>
		</div>
	);
};

export default Forbidden;
