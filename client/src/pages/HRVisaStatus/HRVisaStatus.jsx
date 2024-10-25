// Imports
import React, { useEffect, useState } from "react";
import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  IconButton,
  Tooltip,
  Typography,
  Box,
  Chip,
} from "@mui/material";
import PreviewModal from "../../components/PreviewModal";
import AlertDialog from "../../components/AlertDialog";
import SearchBar from "../../components/SearchBar/SearchBar";
import { useDispatch, useSelector } from "react-redux";
import {
  selectPendingStatuses,
  selectAllStatuses,
  selectMessage,
} from "../../store/hrVisaStatus/hrVisaStatus.selectors";
import {
  approveDocument,
  fetchAllPendingStatuses,
  fetchAllStatuses,
  postFeedback,
  rejectDocument,
} from "../../store/hrVisaStatus/hrVisaStatus.thunk";
import {
  clearSearch,
  setBaseQuery,
  setFilteredList,
} from "../../store/searchSlice/search.slice";
import { showNotification } from "../../store/notificationSlice/notification.slice";
import emailjs from "@emailjs/browser";
import PreviewIcon from "@mui/icons-material/Preview";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import CommentIcon from "@mui/icons-material/Comment";
import EmailIcon from "@mui/icons-material/Email";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { getDocumentMessage } from "../../utils/publicUtils";

// Constants
const headers = [
  "First Name",
  "Last Name",
  "Preferred Name",
  "VISA Title",
  "Start Date",
  "End Date",
  "Days Remaining",
  "Next Step",
];

// Utility Functions
const calculateRemainingDays = (startDate, endDate) => {
  const start = new Date(startDate);
  const end = new Date(endDate);
  return Math.ceil((end - start) / (1000 * 60 * 60 * 24));
};

const HRVisaStatus = () => {
  // State and Redux Setup
  const dispatch = useDispatch();
  const allPending = useSelector(selectPendingStatuses);
  const allStatuses = useSelector(selectAllStatuses);
  const message = useSelector(selectMessage);
  const { query, filteredList } = useSelector((state) => state.search);

  console.log(allStatuses);

  const [selectedFile, setSelectedFile] = useState();
  const [openModal, setOpenModal] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [feedback, setFeedback] = useState("");

  // Handlers and Actions
  const setNameSet = async () => {
    const nameSet = new Set();
    allStatuses.forEach((employee) => {
      if (employee.preferredName) nameSet.add(employee.preferredName);
      if (employee.firstName) nameSet.add(employee.firstName);
      if (employee.lastName) nameSet.add(employee.lastName);
    });
    dispatch(setBaseQuery(Array.from(nameSet)));
  };

  const handleReset = () => dispatch(clearSearch(allStatuses));

  const handleSearch = (value) => {
    const results = allStatuses.filter((item) =>
      [item.firstName, item.lastName, item.preferredName].some((name) =>
        name?.toLowerCase().includes(value.toLowerCase())
      )
    );
    dispatch(setFilteredList(results));
  };

  const sendNotification = async (email, name, documentType) => {
    try {
      if (!email || !name) {
        dispatch(
          showNotification({
            message: "Missing required fields",
            severity: "error",
          })
        );
        return;
      }
      const response = await emailjs.send(
        "service_gzafy3n",
        "template_iq64bnf",
        { name, email, document_type: documentType },
        "3X0ppd2T-UG_dgkkz"
      );
      const message =
        response.status === 200
          ? "Email sent successfully"
          : "Error with emailjs";
      dispatch(showNotification({ message }));
    } catch (error) {
      dispatch(showNotification({ message: error.message, severity: "error" }));
    }
  };

  const handlePreview = (file) => {
    setOpenModal(true);
    setSelectedFile(file);
  };

  const handleApprove = (file) =>
    dispatch(approveDocument({ documentId: file._id, status: "approved" }));

  const handleReject = (file) => {
    dispatch(rejectDocument({ documentId: file._id, status: "rejected" }));
    setOpenDialog(true);
  };

  const handleComment = () => {
    dispatch(postFeedback({ documentId: selectedFile._id, feedback }));
    setOpenDialog(false);
  };

  const handleNotify = (email, name, documentType) =>
    sendNotification(email, name, documentType);

  const renderAction = (row) => {
    const { status, type } = row.nextStep;
    if (status === "pending") {
      return (
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Preview Document">
            <IconButton onClick={() => handlePreview(row.nextStep)}>
              <PreviewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Approve Document">
            <IconButton onClick={() => handleApprove(row.nextStep)}>
              <CheckIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Reject Document">
            <IconButton onClick={() => handleReject(row.nextStep)}>
              <CloseIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    } else if (status === "rejected") {
      return (
        <Box sx={{ display: "flex" }}>
          <Tooltip title="Preview Document">
            <IconButton onClick={() => handlePreview(row.nextStep)}>
              <PreviewIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Send Comment">
            <IconButton
              onClick={() => {
                setOpenDialog(true);
                setSelectedFile(row.nextStep);
              }}
            >
              <CommentIcon />
            </IconButton>
          </Tooltip>
        </Box>
      );
    }
    return (
      <Tooltip title="Send Notification">
        <IconButton onClick={() => handleNotify(row.email, row.username, type)}>
          <EmailIcon />
        </IconButton>
      </Tooltip>
    );
  };

  // Effects
  useEffect(() => {
    if (allStatuses) {
      dispatch(setFilteredList(allStatuses));
      setNameSet();
    }
  }, [allStatuses]);

  useEffect(() => {
    dispatch(fetchAllPendingStatuses());
    dispatch(fetchAllStatuses());
  }, [dispatch]);

  useEffect(() => {
    if (message) dispatch(showNotification({ message }));
  }, [message]);

  // Render
  return (
    <>
      <Box>
        <Typography component="h2" sx={{ mb: 2, fontWeight: "bold" }}>
          In Progress
        </Typography>
        {allPending && allPending.length > 0 && (
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  {headers.map((value) => (
                    <TableCell key={value} align="center">
                      {value}
                    </TableCell>
                  ))}
                  <TableCell align="center">Action</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allPending.map((row) => (
                  <TableRow key={row.username}>
                    <TableCell align="center">{row.firstName ?? ""}</TableCell>
                    <TableCell align="center">{row.lastName ?? ""}</TableCell>
                    <TableCell align="center">
                      {row.preferredName ?? ""}
                    </TableCell>
                    <TableCell align="center">
                      {row.visaStatus?.visaTitle}
                    </TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      {row.visaStatus?.startDate?.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      {row.visaStatus?.endDate?.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      {calculateRemainingDays(
                        row.visaStatus?.startDate,
                        row.visaStatus?.endDate
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {getDocumentMessage(
                        row.nextStep?.type,
                        row.nextStep?.status
                      )}
                    </TableCell>
                    <TableCell align="center">{renderAction(row)}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      <Box sx={{ mt: 5 }}>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <Typography component="h2" sx={{ my: 2, fontWeight: "bold" }}>
            All
          </Typography>
          <SearchBar
            list={allStatuses}
            handleReset={handleReset}
            handleSearch={handleSearch}
          />
        </Box>
        {allStatuses && allStatuses.length > 0 && filteredList && (
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  {headers.map((value) => (
                    <TableCell key={value} align="center">
                      {value}
                    </TableCell>
                  ))}
                  <TableCell align="center">Documents</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {filteredList.map((row) => (
                  <TableRow key={row.username}>
                    <TableCell align="center">{row.firstName ?? ""}</TableCell>
                    <TableCell align="center">{row.lastName ?? ""}</TableCell>
                    <TableCell align="center">
                      {row.preferredName ?? ""}
                    </TableCell>
                    <TableCell align="center">
                      {row.visaStatus?.visaTitle}
                    </TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      {row.visaStatus?.startDate?.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center" sx={{ whiteSpace: "nowrap" }}>
                      {row.visaStatus?.endDate?.slice(0, 10)}
                    </TableCell>
                    <TableCell align="center">
                      {calculateRemainingDays(
                        row.visaStatus?.startDate,
                        row.visaStatus?.endDate
                      )}
                    </TableCell>
                    <TableCell align="center">
                      {getDocumentMessage(
                        row.nextStep?.type,
                        row.nextStep?.status
                      )}
                    </TableCell>
                    <TableCell align="center">
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          maxHeight: "10vh",
                          overflow: "auto",
                        }}
                      >
                        {row.visaStatus?.documents?.map((doc) => (
                          <Chip
                            icon={<AttachFileIcon />}
                            key={doc.type}
                            sx={{ flexShrink: 0, px: 2, width: 260 }}
                            label={doc.filename}
                            onClick={() => handlePreview(doc)}
                          />
                        ))}
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
      {selectedFile && (
        <PreviewModal
          open={openModal}
          setOpen={setOpenModal}
          file={selectedFile}
        />
      )}
      <AlertDialog
        open={openDialog}
        setOpen={setOpenDialog}
        text={feedback}
        setText={setFeedback}
        handleComment={handleComment}
      />
    </>
  );
};

export default HRVisaStatus;
