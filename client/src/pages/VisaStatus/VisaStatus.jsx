import { useEffect, useState } from "react";
import { Typography, Button, Box } from "@mui/material";
import { selectVisaState } from "../../store/visaSlice/visa.selectors";
import { useSelector, useDispatch } from "react-redux";
import DropZone from "../../components/DropZone";
import FileList from "../../components/FileList";
import {
  visaStatusInit,
  updateVisaStatus,
} from "../../store/visaSlice/visa.thunk";
import CustomizedStepper from "../../components/CustomizedStepper";
import { getDocumentMessage } from "../../utils/publicUtils";

const VisaStatus = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const file = useSelector(selectVisaState);

  const { status, feedback, type, src } = file;

  const dispatch = useDispatch();

  const handleSubmit = () => {
    dispatch(updateVisaStatus({ type, uploadedFile }));
    setUploadedFile(null);
  };

  useEffect(() => {
    dispatch(visaStatusInit());
  }, [dispatch]);

  return (
    <>
      <Typography variant="h5" sx={{ pb: 2 }}>
        <strong>Next Step:</strong> {getDocumentMessage(type, status)}
      </Typography>

      <CustomizedStepper nextStep={{ status, type }} />

      <Box sx={{ my: 2 }}>
        <Typography sx={{ lineHeight: 2 }}></Typography>
        {feedback && (
          <Typography sx={{ lineHeight: 2 }}>
            <strong> HR Feedback:</strong> {feedback}
          </Typography>
        )}
      </Box>
      {src && <FileList files={[file]}></FileList>}
      {(status === "not-submitted" || status === "rejected") && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <DropZone onUpload={setUploadedFile} />
          {uploadedFile && (
            <Button
              onClick={handleSubmit}
              variant="contained"
              size="large"
              sx={{ margin: "auto", mt: 2 }}
            >
              Submit
            </Button>
          )}
        </Box>
      )}
    </>
  );
};

export default VisaStatus;
