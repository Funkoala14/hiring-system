import React from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  ListItemText,
} from "@mui/material";
import PreviewIcon from "@mui/icons-material/Preview";

const FileList = ({ files }) => {
  console.log(files);

  return files.map(({ filename, src }) => (
    <Accordion key={filename} sx={{ backgroundColor: "white", my: 0 }}>
      <AccordionSummary
        expandIcon={<PreviewIcon />}
        aria-controls="panel1-content"
        id="panel1-header"
      >
        <ListItemText primary={filename} />
      </AccordionSummary>
      <AccordionDetails>
        <iframe
          src={src}
          title={filename}
          width="100%"
          style={{
            border: "none",
            height: "75vh",
          }}
        ></iframe>
      </AccordionDetails>
    </Accordion>
  ));
};

export default FileList;
