import { useState } from "react";
import { Modal, Box, TextField, Button } from "@mui/material";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80vw",
  bgcolor: "background.paper",
  boxShadow: 24,
  display: "flex",
};

const PreviewModal = ({ open, setOpen, file }) => {
  const handleClose = () => setOpen(false);

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <iframe
          src={file.src}
          title={file.filename}
          width="100%"
          style={{
            border: "none",
            height: "80vh",
          }}
        ></iframe>
      </Box>
    </Modal>
  );
};

export default PreviewModal;
