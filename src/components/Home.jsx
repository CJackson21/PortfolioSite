import { Box, Stack, Typography } from "@mui/material";
import TypingEffect from "./Typewriter";
import "../index.css";

function MainPage() {
  return (
    <Box sx={{ position: "relative", height: "100vh" }}>
      {/* Main Content */}
      <Box
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Stack spacing={2} alignItems='center' textAlign='center'>
          <Typography sx={{ fontSize: "2.5rem" }}>
            {"Hey there, I'm"}
          </Typography>
          <Typography id='name' fontWeight='bold' sx={{ fontSize: "5rem" }}>
            Caleb Jackson
          </Typography>
          <Typography sx={{ fontSize: "2.5rem" }}>
            Full Stack Developer
          </Typography>
        </Stack>

        <Box
          textAlign='center'
          sx={{
            mt: "2rem",
          }}
        >
          <TypingEffect />
        </Box>
      </Box>
    </Box>
  );
}

export default MainPage;
