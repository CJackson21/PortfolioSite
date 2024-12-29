import PropTypes from "prop-types";
import { IconButton, Box } from "@mui/material";

const HamburgerButton = ({ onClick }) => {
  return (
    <IconButton
      onClick={onClick}
      sx={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        alignItems: "flex-start",
        width: "1.6em",
        height: "1em",
        padding: 0,
        "&:hover .line": {
          width: "100%",
        },
      }}
    >
      <Box
        className='line'
        sx={{
          width: "40%",
          height: "4px",
          backgroundColor: "secondary.main",
          transition: "width 0.3s ease",
        }}
      />
      <Box
        className='line'
        sx={{
          width: "70%",
          height: "4px",
          backgroundColor: "secondary.main",
          transition: "width 0.4s ease",
        }}
      />
      <Box
        className='line'
        sx={{
          width: "100%",
          height: "4px",
          backgroundColor: "secondary.main",
          transition: "width 0.3s ease",
        }}
      />
    </IconButton>
  );
};

HamburgerButton.propTypes = {
  onClick: PropTypes.func.isRequired,
};

export default HamburgerButton;
