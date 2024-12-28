import React from "react";
import { Link } from "react-router-dom";
import { Stack, Typography, Button } from "@mui/material";
import TypingEffect from "./Typewriter";
import "../index.css";

function MainPage() {
  // If you need the theme inside MainPage, you can do:
  // const { theme } = useCustomTheme();
  // const { palette } = theme;

  return (
    <Stack
      spacing={4}
      alignItems='center'
      justifyContent='center'
      sx={{ padding: 4, minHeight: "100vh" }}
    >
      {/* Main introduction section */}
      <Stack
        className='mainWrapper'
        spacing={2}
        alignItems='center'
        textAlign='center'
      >
        <Typography variant='h4' component='p'>
          {"Hey there, I'm"}
        </Typography>
        <Typography id='name' variant='h2' fontWeight='bold'>
          Caleb Jackson
        </Typography>
        <Typography id='notName' variant='h5' component='p'>
          Full Stack Developer
        </Typography>
      </Stack>

      {/* Typing effect */}
      <Stack id='about' textAlign='center'>
        <TypingEffect />
      </Stack>

      {/* Links section */}
      <Stack
        className='information'
        direction='row'
        spacing={2}
        justifyContent='center'
      >
        <Button
          href='https://github.com/CJackson21'
          target='_blank'
          variant='contained'
          color='primary'
        >
          GitHub
        </Button>
        <Button
          href='/CalebJackson_SoftwareEngineer.pdf'
          target='_blank'
          rel='noopener noreferrer'
          variant='contained'
          color='secondary'
        >
          Resume
        </Button>
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
  );
}

export default MainPage;
