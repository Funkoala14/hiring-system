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

const VisaStatus = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const file = useSelector(selectVisaState);
  console.log(file);

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
        Visa Status
      </Typography>

      <CustomizedStepper nextStep={{ status, type }} />

      <Box sx={{ my: 2 }}>
        <Typography sx={{ textTransform: "capitalize", lineHeight: 2 }}>
          <strong>Approval Status:</strong> {status}
        </Typography>
        <Typography sx={{ textTransform: "capitalize", lineHeight: 2 }}>
          <strong> HR Feedback:</strong> {feedback}
        </Typography>
      </Box>

      {status === "not-submitted" && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <DropZone onUpload={setUploadedFile} />
          <Button
            onClick={handleSubmit}
            variant="contained"
            size="large"
            sx={{ margin: "auto", mt: 2 }}
          >
            Submit
          </Button>
        </Box>
      )}
      {src && <FileList files={[file]}></FileList>}
    </>
  );
};

export default VisaStatus;
