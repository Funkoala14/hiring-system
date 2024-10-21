import { useEffect, useState } from 'react'
import { Typography, Button, Box } from '@mui/material';
import { selectVisaState } from '../../store/visaSlice/visa.selectors';
import { useSelector, useDispatch } from 'react-redux';
import DropZone from '../../components/DropZone';
import FileList from '../../components/FileList';
import { visaStatusInit, updateVisaStatus } from '../../store/visaSlice/visa.thunk';
import CustomizedStepper from '../../components/CustomizedStepper';


const VisaStatus = () => {
    const [uploadedFile, setUploadedFile] = useState(null)
    const { status, feedback, type, file } = useSelector(selectVisaState)

    const dispatch = useDispatch()

    const handleSubmit = () => {
        dispatch(updateVisaStatus({ type, uploadedFile }))
        setUploadedFile(null)
    }

    useEffect(() => {
        dispatch(visaStatusInit())
    }, [dispatch])

    return (
        <>
            <Typography variant="h5" sx={{ pb: 2 }}>
                Visa Status
            </Typography>

            <CustomizedStepper nextStep={({ status, feedback, type, file })} />

            <Box sx={{ my: 2 }}>
                <Typography sx={{ textTransform: 'capitalize', lineHeight: 2 }}>
                    <strong>Approval Status:</strong> {status}
                </Typography>
                <Typography sx={{ textTransform: 'capitalize', lineHeight: 2 }}>
                    <strong> HR Feedback:</strong>  {feedback}
                </Typography>
            </Box>

            {status === "not-submitted" &&
                <Box sx={{ display: 'flex', flexDirection: "column" }}>
                    <DropZone setFile={setUploadedFile} />
                    {uploadedFile && <FileList files={[uploadedFile]}></FileList>}
                    <Button onClick={handleSubmit} variant="contained" size="large" sx={{ margin: "auto" }}>Submit</Button>
                </Box>
            }
            {file && <FileList files={[file]}></FileList>}

        </>
    )
}

export default VisaStatus