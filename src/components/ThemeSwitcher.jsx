import { Button } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import DarkModeIcon from '@mui/icons-material/DarkModeOutlined';
import LightModeIcon from '@mui/icons-material/WbSunny';

function ThemeSwitcher() {
  const theme = useTheme();
  const { handleSelectTheme } = theme;

  // Determine if we're currently in dark mode
  const isDark = theme.palette.mode === 'dark';

  // Handler to toggle between dark and light
  const toggleThemeMode = () => {
    // If we are in dark mode, switch to light; otherwise switch to dark
    const newMode = isDark ? 'light' : 'dark';
    // Our original callback expects: handleSelectTheme(event, newValue)
    handleSelectTheme(null, newMode);
  };

  return (
    <Button
      variant='contained'
      color='secondary'
      onClick={toggleThemeMode}
      startIcon={isDark ? <LightModeIcon /> : <DarkModeIcon />}
      sx={{
        minWidth: 'fit-content',
        width: 'fit-content',
        padding: '0.5rem 1rem',
        display: 'inline-flex',
        alignItems: 'center',
        gap: '0.5rem',
        textTransform: 'none',
        whiteSpace: 'nowrap',
      }}
    >
      {isDark ? 'Switch to Light' : 'Switch to Dark'}
    </Button>
  );
}

export default ThemeSwitcher;
