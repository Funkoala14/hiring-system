import { useEffect, useState } from 'react'
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Typography, Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { selectDocumentFeedback, selectDocumentStatus } from '../../store/visaSlice/visa.selectors';
import { useSelector, useDispatch } from 'react-redux';
import DropZone from '../../components/DropZone';
import FileList from '../../components/FileList';

const VisaStatus = () => {
    const [file, setFile] = useState(null)
    const status = useSelector(selectDocumentStatus)
    const feedback = useSelector(selectDocumentFeedback)
    const dispatch = useDispatch()

    const handleUpload = (e) => {
        if (e.target.files) { setFile(e.target.files[0]) }
    }

    useEffect(() => {
        // dispatch(visaStatusInit)
    }, [])

    return (
        <>
            <Typography variant="h5" sx={{ pb: 2 }}>
                Visa Status
            </Typography>
            <Typography sx={{ textTransform: 'capitalize' }}>Approval Status: {status}</Typography>
            <Typography sx={{ textTransform: 'capitalize' }}>HR Feedback: {feedback}</Typography>

            <DropZone setFile={setFile} />
            {file && <FileList files={[file]}></FileList>}
        </>
    )
}

export default VisaStatus