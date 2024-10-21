import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, ListItemText } from '@mui/material'
import PreviewIcon from '@mui/icons-material/Preview'

const FileList = ({ files }) => {

    return (
        files.map((file) =>
            <Accordion key={file.name} sx={{ backgroundColor: 'white' }} sx={{ my: 2 }}>
                <AccordionSummary
                    expandIcon={<PreviewIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <ListItemText primary={file.name} secondary={`${file.size} bytes`} />
                </AccordionSummary>
                <AccordionDetails>
                    <iframe
                        src={URL.createObjectURL(file)}
                        title={file.name}
                        width="100%"
                        style={{
                            border: 'none',
                            height: "80vh"
                        }}
                    ></iframe>
                </AccordionDetails>
            </Accordion>
        ))
}

export default FileList;

