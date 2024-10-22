// src/pages/NotFound.js

import React from "react";
import { Typography, Container, Button, Box } from "@mui/material";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
	const navigate = useNavigate();

	return (
		<Container>
			<Box mt={5} textAlign="center">
				<Typography variant="h2" color="error" gutterBottom>
					404
				</Typography>
				<Typography variant="h5" gutterBottom>
					Page Not Found
				</Typography>
				<Button
					variant="contained"
					color="primary"
					onClick={() => navigate("/")}
				>
					Go to Home
				</Button>
			</Box>
		</Container>
	);
};

export default NotFound;
