import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

function ResumePopup() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Text link to open the modal */}
      <Typography
        component='span'
        sx={{
          textDecoration: "none",
          cursor: "pointer",
          color: "primary.main", // Consistent with primary color
          fontWeight: 500,
          "&:hover": { color: "primary.dark" }, // Slight darkening on hover
          "&:visited": { color: "primary.main" }, // Prevent visited state color change
        }}
        onClick={() => setOpen(true)}
      >
        View Resume
      </Typography>

      {/* Modal with <iframe> for your PDF */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth='lg'
      >
        <DialogTitle>My Resume</DialogTitle>
        <DialogContent dividers>
          <iframe
            src='/CalebJackson_SoftwareEngineer.pdf#toolbar=0&navpanes=0&scrollbar=0'
            width='100%'
            style={{
              height: "80vh",
              border: "none",
              margin: 0,
              padding: 0,
              display: "block",
            }}
            title='My Embedded Resume'
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default ResumePopup;
