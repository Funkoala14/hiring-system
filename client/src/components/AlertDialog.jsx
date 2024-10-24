import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import { TextField } from "@mui/material";
import React from "react";

export default function AlertDialog({
  open,
  setOpen,
  text,
  setText,
  handleComment,
}) {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent sx={{ width: "30vw" }}>
          <TextField
            id="outlined-multiline-flexible"
            label="Reject Reason"
            multiline
            value={text}
            rows={4}
            fullWidth
            onChange={(e) => setText(e.target.value)}
          />
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 3 }}>
          <Button onClick={handleClose}>Cancel</Button>
          <Button
            onClick={() => {
              handleClose();
              handleComment();
            }}
            autoFocus
            variant="contained"
          >
            Submit Feedback
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
