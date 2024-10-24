import { useDropzone } from "react-dropzone";
import {
  Paper,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/system";
import PreviewIcon from "@mui/icons-material/Preview";
import { useState } from "react";

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

const DropZone = ({ onUpload }) => {
  const { getRootProps, getInputProps } = useDropzone({
    multiple: false, // Allow only one file
    onDrop: (acceptedFiles) => {
      onUpload(acceptedFiles[0]);
      setFile(acceptedFiles[0]);
    },
  });

  const [file, setFile] = useState();

  return (
    <>
      <DropZoneContainer {...getRootProps()}>
        <input {...getInputProps()} />
        <Typography variant="h6" gutterBottom>
          Drag 'n' drop a file here, or click to select one
        </Typography>
      </DropZoneContainer>
      {file && (
        <Accordion key={file.name} sx={{ backgroundColor: "white" }}>
          <AccordionSummary
            expandIcon={<PreviewIcon />}
            aria-controls="panel1-content"
            id="panel1-header"
          >
            <ListItemText
              primary={file.name}
              secondary={`${file.size} bytes`}
            />
          </AccordionSummary>
          <AccordionDetails>
            <iframe
              src={URL.createObjectURL(file)}
              title={file.name}
              width="100%"
              style={{
                border: "none",
                height: "80vh",
              }}
            ></iframe>
          </AccordionDetails>
        </Accordion>
      )}
    </>
  );
};

export default DropZone;
