import { useEffect, useState } from "react";
import { Typography, Button, Box, ListItem } from "@mui/material";
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
import AttachFileIcon from "@mui/icons-material/AttachFile";

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

  const handleTemplateDownload = (pdfUrl) => {
    const link = document.createElement("a");
    link.href = pdfUrl;
    link.target = "_blank";
    link.download = pdfUrl.split("/").pop();
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  return (
    <>
      <Typography variant="h5" sx={{ pb: 2 }}>
        <strong>Next Step:</strong> {getDocumentMessage(type, status)}
      </Typography>
      {status === "not-submitted" && type === "I-983" && (
        <Box sx={{ display: "flex", gap: 2 }}>
          <ListItem
            sx={{
              width: "fit-content",
              bgcolor: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() =>
              handleTemplateDownload(
                "https://susieshi.s3.us-east-2.amazonaws.com/1729812252247-i983.pdf"
              )
            }
          >
            <AttachFileIcon />
            Empty Template.pdf
          </ListItem>
          <ListItem
            sx={{
              width: "fit-content",
              bgcolor: "white",
              borderRadius: "4px",
              cursor: "pointer",
            }}
            onClick={() =>
              handleTemplateDownload(
                "https://susieshi.s3.us-east-2.amazonaws.com/1729811720205-f1-form-i-983-sample.pdf"
              )
            }
          >
            <AttachFileIcon />
            Sample Template.pdf
          </ListItem>
        </Box>
      )}
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
