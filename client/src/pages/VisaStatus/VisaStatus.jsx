import { useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import { Typography, Card } from '@mui/material';

const VisuallyHiddenInput = styled('input')({
    clip: 'rect(0 0 0 0)',
    clipPath: 'inset(50%)',
    height: 1,
    overflow: 'hidden',
    position: 'absolute',
    bottom: 0,
    left: 0,
    whiteSpace: 'nowrap',
    width: 1,
});

const FileUploadButton = ({ handleUpload }) => {
    return (
        <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
        >
            Upload files
            <VisuallyHiddenInput
                type="file"
                onChange={handleUpload}
                multiple
            />
        </Button>
    )
}

const VisaStatus = () => {
    const [file, setFile] = useState(null)
    const handleUpload = (e) => {
        if (e.target.files) { setFile(e.target.files[0]) }
    }
    return (
        <>
            <FileUploadButton handleUpload={handleUpload} />
            {file &&
                <div>
                    <Typography variant="subtitle1" gutterBottom>
                        {file.name}
                    </Typography>
                    <iframe
                        src={`${URL.createObjectURL(file)}`}
                        title={`${file.name}`}
                        width="100%"
                        style={{
                            border: 'none',
                            height: "60vh"
                        }}
                    ></iframe>
                </div>
            }
        </>
    )
}


export default VisaStatus