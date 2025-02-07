import { Box, Stack, Typography } from "@mui/material";
import TypingEffect from "./Typewriter";
import "../index.css";

// Main home introductory page
function Home() {
  return (
    <Box sx={{ position: "relative", height: "100vh", overflowY: "hidden" }}>
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          px: 2,
        }}
      >
        <Stack spacing={2} alignItems='center'>
          <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" } }}>
            {"Hey there, I'm"}
          </Typography>
          <Typography
            id='name'
            fontWeight='bold'
            sx={{ fontSize: { xs: "3rem", sm: "5rem" } }}
          >
            Caleb Jackson
          </Typography>
          <Typography sx={{ fontSize: { xs: "1.5rem", sm: "2.5rem" } }}>
            Full Stack Developer
          </Typography>
          <TypingEffect />
        </Stack>
      </Box>
    </Box>
  );
}

export default Home;
