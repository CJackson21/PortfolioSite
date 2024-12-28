import { Link } from "react-router-dom";
import { Box, Stack, Typography, Button } from "@mui/material";
import ResumePopup from "./Resume";
import ThemeSwitcher from "./ThemeSwitcher";
import TypingEffect from "./Typewriter";
import "../index.css";

function MainPage() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        height: "100vh", // Full viewport height
      }}
    >
      {/* ThemeSwitcher positioned at the top */}
      <Box
        sx={{
          position: "absolute",
          top: "16px",
          right: "16px",
        }}
      >
        <ThemeSwitcher />
      </Box>

      {/* Main content, Stack takes remaining space */}
      <Stack
        spacing={4}
        alignItems='center'
        justifyContent='center'
        sx={{
          flexGrow: 1,
        }}
      >
        {/* Main introduction section */}
        <Stack
          className='mainWrapper'
          spacing={2}
          alignItems='center'
          textAlign='center'
        >
          <Typography variant='h4'>{"Hey there, I'm"}</Typography>
          <Typography id='name' variant='h2' fontWeight='bold'>
            Caleb Jackson
          </Typography>
          <Typography id='notName' variant='h5'>
            Full Stack Developer
          </Typography>
        </Stack>

        {/* Typing effect */}
        <Stack
          id='about'
          textAlign='center'
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <TypingEffect />
        </Stack>

        {/* Links section */}
        <Stack className='information' spacing={2} justifyContent='center'>
          <Button
            href='https://github.com/CJackson21'
            target='_blank'
            variant='contained'
            color='primary'
          >
            GitHub
          </Button>
          {/* Use ResumePopup */}
          <ResumePopup />
          <Button
            href='https://www.linkedin.com/in/caleb-jackson-b08660264'
            target='_blank'
            variant='contained'
            color='primary'
          >
            LinkedIn
          </Button>
          <Button component={Link} to='/about' variant='contained' color='info'>
            About Me
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}

export default MainPage;
