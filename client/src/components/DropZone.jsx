import { useDropzone } from "react-dropzone";
import { Paper, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const DropZoneContainer = styled(Paper)(({ theme }) => ({
	padding: theme.spacing(3),
	textAlign: "center",
	backgroundColor: theme.palette.background.default,
	color: theme.palette.text.secondary,
	cursor: "pointer",
	transition: "border-color 0.2s ease-in-out",
	"&:hover": {
		borderColor: theme.palette.primary.main,
	},
}));

const DropZone = ({ setFile }) => {
	const { getRootProps, getInputProps } = useDropzone({
		multiple: false, // Allow only one file
		onDrop: (acceptedFiles) => {
			setFile(acceptedFiles[0]);
		},
	});

	return (
		<DropZoneContainer {...getRootProps()}>
			<input {...getInputProps()} />
			<Typography variant="h6" gutterBottom>
				Drag 'n' drop a file here, or click to select one
			</Typography>
		</DropZoneContainer>
	);
};

export default DropZone;
