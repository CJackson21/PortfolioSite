import React from "react";
import { Button, Dialog, DialogTitle, DialogContent } from "@mui/material";

function ResumePopup() {
  const [open, setOpen] = React.useState(false);

  return (
    <>
      {/* Button to open the modal */}
      <Button
        variant='contained'
        color='secondary'
        onClick={() => setOpen(true)}
      >
        View Resume
      </Button>

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
