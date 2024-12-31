import React from "react";
import PropTypes from "prop-types";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

function Resume({ color, isMobile }) {
  const [open, setOpen] = React.useState(false);

  const handleViewResume = () => {
    if (isMobile) {
      // Redirect to the PDF link on mobile
      window.open("/CalebJackson_SoftwareEngineer.pdf", "_blank");
    } else {
      // Open the dialog on desktop
      setOpen(true);
    }
  };

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
        onClick={handleViewResume}
      >
        View Resume
      </Typography>

      {!isMobile && (
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
              }}
              title='My Embedded Resume'
            />
          </DialogContent>
        </Dialog>
      )}
    </>
  );
}

Resume.propTypes = {
  color: PropTypes.func.isRequired,
  isMobile: PropTypes.bool.isRequired,
};

export default Resume;
