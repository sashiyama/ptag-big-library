import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { theme } from './userTheme'

import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { ThemeProvider } from '@mui/material/styles'

const UserHeader: React.FC<{
  newUserPath: string
}> = ({ newUserPath }) => {
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
          <Button
            href={newUserPath}
            color="secondary"
            variant="outlined"
            sx={{ my: 1, mx: 1.5 }}
          >
            Login
          </Button>
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('user-header')

  if (container && container.dataset.newUserPath) {
    const root = createRoot(container)
    root.render(<UserHeader newUserPath={container.dataset.newUserPath} />)
  }
})
