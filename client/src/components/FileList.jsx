import React from 'react'
import { Accordion, AccordionDetails, AccordionSummary, ListItemText } from '@mui/material'
import PreviewIcon from '@mui/icons-material/Preview'

const FileList = ({ files }) => {
    console.log(files);

    return (
        files.map((file) =>
            <Accordion sx={{ backgroundColor: 'white' }}>
                <AccordionSummary
                    expandIcon={<PreviewIcon />}
                    aria-controls="panel1-content"
                    id="panel1-header"
                >
                    <ListItemText primary={file.path} secondary={`${file.size} bytes`} />
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

export default FileList

