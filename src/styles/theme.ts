import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      light: '#5BE584',
      main: '#00AB55',
      dark: '#007B55',
      contrastText: '#FFFFFF',
    },
    secondary: {
      light: '#84A9FF',
      main: '#1939B7',
      dark: '#84A9FF',
      contrastText: '#FFFFFF',
    },
    info: {
      light: '#61F3F3',
      main: '#00B8D9',
      dark: '#006C9C',
      contrastText: '#FFFFFF',
    },
    success: {
      light: '#86E8AB',
      main: '#36B37E',
      dark: '#1B806A',
      contrastText: '#FFFFFF',
    },
    warning: {
      light: '#FFD666',
      main: '#FFAB00',
      dark: '#B76E00',
      contrastText: '#212B36',
    },
    error: {
      light: '#FFAC82',
      main: '#FF5630',
      dark: '#B71D18',
      contrastText: '#FFFFFF',
    }
  },
});

export default theme
