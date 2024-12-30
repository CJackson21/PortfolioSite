import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

function ResumePopup({ color }) {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      <Typography
        sx={{
          fontSize: "1.5rem",
          textDecoration: "none",
          cursor: "pointer",
          color,
          fontWeight: 500,
          "&:hover": { color: "primary.dark" },
          "&:visited": { color: "primary.main" },
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

ResumePopup.propTypes = {
  color: PropTypes.string.isRequired,
};

export default ResumePopup;
