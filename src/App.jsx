import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./components/Home";
import ThemeProviderWrapper from "./hooks/ThemeProviderWrapper"; // Wraps app with MUI theme
import Stack from "@mui/material/Stack"; // Import Stack from Material-UI

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
          </Routes>
        </Stack>
      </Router>
    </ThemeProviderWrapper>
  );
}

export default App;
