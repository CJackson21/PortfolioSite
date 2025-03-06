import React from "react";
import PropTypes from "prop-types";
import { useTheme } from "@mui/material/styles";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

function Resume({ color, isMobile }) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();

  const handleViewResume = () => {
    if (isMobile) {
      // redirect to the PDF link on mobile
      window.open("/caleb_jackson_software_engineer.pdf", "_blank");
    } else {
      // open the dialog on desktop
      setOpen(true);
    }
  };

  return (
    <>
      <Typography
        sx={{
          fontSize: isMobile ? "1.2rem" : "1.5rem",
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
          <DialogTitle
            sx={{
              color:
                theme.palette.mode === "dark"
                  ? theme.palette.text.primary
                  : theme.palette.text.secondary,
            }}
          >
            My Resume
          </DialogTitle>
          <DialogContent dividers>
            <iframe
              src='/caleb_jackson_software_engineer.pdf#toolbar=0&navpanes=0&scrollbar=0'
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

export default React.memo(Resume);
