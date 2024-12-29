import React from "react";
import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./SideBar";
import ThemeSwitcher from "./ThemeSwitcher";
import TypingEffect from "./Typewriter";
import HamburgerButton from "./HamburgerButton";
import "../index.css";

function MainPage() {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen((prev) => !prev);
  };

  return (
    <Box sx={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      {/* Top bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "1rem",
        }}
      >
        <HamburgerButton onClick={toggleSidebar} />
        <ThemeSwitcher />
      </Box>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />
      <Stack
        spacing={4}
        alignItems='center'
        justifyContent='center'
        sx={{ flexGrow: 1 }}
      >
        <Stack
          className='mainWrapper'
          spacing={2}
          alignItems='center'
          textAlign='center'
          sx={{ height: "20vh" }}
        >
          <Typography variant='h4'>{"Hey there, I'm"}</Typography>
          <Typography id='name' variant='h2' fontWeight='bold'>
            Caleb Jackson
          </Typography>
          <Typography id='notName' variant='h5'>
            Full Stack Developer
          </Typography>
        </Stack>

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
      </Stack>
    </Box>
  );
}

export default MainPage;
