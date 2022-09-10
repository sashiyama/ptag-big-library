import { createTheme } from '@mui/material/styles'

export const theme = createTheme({
  palette: {
    action: {
      disabled: '#ffffff42',
    },
    background: {
      default: '#001e3c',
    },
    text: {
      primary: '#fff',
      secondary: '#fff',
    },
    primary: {
      light: '#001e3c',
      main: '#0a1929',
      dark: '#07131f',
      contrastText: '#fff',
    },
    secondary: {
      light: '#5393ff',
      main: '#2979ff',
      dark: '#1c54b2',
      contrastText: '#fff',
    },
  },
})
