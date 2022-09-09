import * as React from 'react'

import { Copyright } from '../shared/copyright'

import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import { createTheme, ThemeProvider } from '@mui/material/styles'

const theme = createTheme({
  palette: {
    background: {
      default: '#001e3c',
    },
    text: {
      primary: '#fff',
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

export const Page: React.FC<{
  children: React.Node
}> = ({
  children
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Typography variant="h6" color="inherit" noWrap sx={{ flexGrow: 1 }}>
            PTAG Library β
          </Typography>
          <nav>
            <Link
              variant="button"
              color="text.primary"
              href="https://github.com/sashiyama"
              sx={{ my: 1, mx: 1.5 }}
            >
              Support
            </Link>
          </nav>
          <Button href="#" color="secondary" variant="outlined" sx={{ my: 1, mx: 1.5 }}>
            Login
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        {children}
      </main>
      <Box sx={{ bgcolor: 'background.default', p: 6 }} component="footer">
        <Copyright />
      </Box>
    </ThemeProvider>
  )
}
