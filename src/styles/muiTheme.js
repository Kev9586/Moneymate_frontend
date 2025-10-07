import { createTheme } from '@mui/material/styles';

// A basic theme for Material-UI components
const muiTheme = createTheme({
  palette: {
    mode: 'dark', // Matching the app's dark theme
    primary: {
      main: '#3f51b5', // A standard primary color
    },
    secondary: {
      main: '#f50057', // A standard secondary color
    },
    background: {
      default: '#1A1A1A',
      paper: '#2C2C2C',
    },
    text: {
      primary: '#FFFFFF',
      secondary: '#B0B0B0',
    }
  },
  typography: {
    fontFamily: 'Inter, sans-serif',
  },
});

export default muiTheme;