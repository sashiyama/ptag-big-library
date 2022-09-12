import { createTheme } from '@mui/material/styles'

import type {} from '@mui/x-data-grid/themeAugmentation'

export const theme = createTheme({
  components: {
    // Use `MuiDataGrid` on DataGrid, DataGridPro and DataGridPremium
    MuiDataGrid: {
      styleOverrides: {
        root: {
          backgroundColor: '#07131f',
        },
      },
    },
  },
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
