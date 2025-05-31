import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import TypingEffect from "../ui/Typewriter";
import PropTypes from "prop-types";

// Main home introductory page
const Home = React.forwardRef((props, ref) => {
  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      <Box
        ref={ref}
        id="home"
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 2,
        }}
      >
        {/* Content of the Home section */}
        <Stack spacing={2} alignItems="center">
          <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" } }}>
            {"Hey there, I'm"}
          </Typography>
          <Typography
            fontWeight="bold"
            sx={{ fontSize: { xs: "2.5rem", sm: "5rem" } }}
          >
            Caleb Jackson
          </Typography>
          <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" } }}>
            Full Stack Developer
          </Typography>
          {props?.introFinished && <TypingEffect startDelay={600} />}
        </Stack>
      </Box>
    </Box>
  );
});

Home.displayName = "Home";

Home.propTypes = {
  introFinished: PropTypes.bool,
};

export default React.memo(Home);
