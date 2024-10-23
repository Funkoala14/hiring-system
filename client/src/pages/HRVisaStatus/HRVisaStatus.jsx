import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Paper,
  Modal,
  Box,
  Typography,
  Button,
} from "@mui/material";
import { selectPendingStatuses } from "../../store/hrVisaStatus/hrVisaStatus.selectors";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchAllPendingStatuses } from "../../store/hrVisaStatus/hrVisaStatus.thunk";

const headers = [
  "Name",
  "VISA Title",
  "Start Date",
  "End Date",
  "Days Remaining",
  "Next Step",
  "Action",
];

function calculateRemainingDays(startDate, endDate) {
  const start = new Date(startDate);
  const end = new Date(endDate);

  const diffInMilliseconds = end - start;

  const remainingDays = Math.ceil(diffInMilliseconds / (1000 * 60 * 60 * 24));

  return remainingDays;
}

const HRVisaStatus = () => {
  const allPending = useSelector(selectPendingStatuses);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchAllPendingStatuses());
  }, [dispatch]);
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  return (
    <>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              {headers.map((value) => (
                <TableCell key={value}>{value}</TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {allPending.map((row) => (
              <TableRow
                key={row.username}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.username}
                </TableCell>
                <TableCell>{row.visaStatus.visaTitle}</TableCell>
                <TableCell>{row.visaStatus.startDate}</TableCell>
                <TableCell>{row.visaStatus.endDate}</TableCell>
                <TableCell>
                  {calculateRemainingDays(
                    row.visaStatus.startDate,
                    row.visaStatus.endDate
                  )}
                </TableCell>
                <TableCell>
                  {`${row.nextStep.type}, ${row.nextStep.status}`}
                </TableCell>
                <TableCell>
                  <Button onClick={handleOpen}>Open modal</Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default HRVisaStatus;
