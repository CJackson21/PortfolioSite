import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AboutMe from "./components/AboutMe";
import Home from "./components/Home";
import ThemeProviderWrapper from "./hooks/ThemeProviderWrapper"; // Wraps app with MUI theme
import Stack from "@mui/material/Stack"; // Import Stack from Material-UI
import "./App.css";

function App() {
  return (
    <ThemeProviderWrapper>
      <Router>
        <Stack
          className='App'
          direction='column'
          spacing={2} // Adds spacing between items
        >
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/about' element={<AboutMe />} />
          </Routes>
        </Stack>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
