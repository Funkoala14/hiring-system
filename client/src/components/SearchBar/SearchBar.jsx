import React, { useEffect, useState } from "react";
import {
	Autocomplete,
	TextField,
	InputAdornment,
	List,
	ListItem,
	Typography,
	Paper,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { styled } from "@mui/system";
import { useDispatch, useSelector } from "react-redux";
import {
	clearSearch,
	resetQueryList,
	setFilteredList,
	setQuery,
	setQueryList,
} from "../../store/searchSlice/search.slice";

const StyledTextField = styled(TextField)(({ theme }) => ({
	"& .MuiOutlinedInput-root": {
		borderRadius: 30, // Rounded corners
		paddingLeft: 10,
		backgroundColor: "#fff", // Light background color
		boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.1)", // Soft shadow
		"& fieldset": {
			border: "none", // Remove default border
		},
		"&:hover fieldset": {
			border: "none",
		},
		"&.Mui-focused fieldset": {
			border: "1px solid #d1d1d1", // Subtle border when focused
		},
	},
	"& .MuiInputBase-input": {
		padding: "10px 12px",
	},
}));

const SearchBar = ({ list, handleReset, handleSearch }) => {
	const dispatch = useDispatch();
	const { query, queryList, baseQueryList, searched } = useSelector(
		(state) => state.search
	);

	// Filter employees based on query
	useEffect(() => {
		if (query) {
			const queryRes = baseQueryList?.filter((name) =>
				name?.toLowerCase().includes(query.toLowerCase())
			);

			dispatch(setQueryList(queryRes));
		} else {
			handleReset();
		}
	}, [query]);

	const handleSelect = (value) => {
		if (value) {
			dispatch(setQuery(value));
			dispatch(resetQueryList());
			handleSearch();
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === "Enter") {
			dispatch(resetQueryList());
			handleSearch();
		}
	};

	return (
		<div style={{ position: "relative", width: "300px" }}>
			{/* Search Input */}
			<StyledTextField
				variant="outlined"
				placeholder="Search"
				value={query}
				onChange={(e) => dispatch(setQuery(e.target.value))} // Update query on each key press
				InputProps={{
					startAdornment: (
						<InputAdornment position="start">
							<SearchIcon style={{ color: "#b0b0b0" }} />
						</InputAdornment>
					),
				}}
				onKeyDown={handleKeyDown}
				fullWidth
			/>

			{/* Search Results */}
			{query && !searched && (
				<Paper
					elevation={3}
					style={{
						position: "absolute",
						top: "55px",
						left: 0,
						right: 0,
						zIndex: 1000,
						borderRadius: "10px",
						padding: "10px",
					}}
				>
					{queryList.length > 0 ? (
						<List>
							{queryList.map((name) => (
								<ListItem
									key={name}
									onClick={() => handleSelect(name)}
								>
									<Typography variant="body1">
										{name}
									</Typography>
								</ListItem>
							))}
						</List>
					) : (
						<Typography variant="body2" color="textSecondary">
							No records found
						</Typography>
					)}
				</Paper>
			)}
		</div>
	);
};
export default SearchBar;
