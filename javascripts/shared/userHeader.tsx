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

import * as Rails from '@rails/ujs'

type IProps = {
  new_user_path: string
  sessions_path: string
  is_logged_in: boolean
}

const UserHeader: React.FC<IProps> = ({
  new_user_path,
  sessions_path,
  is_logged_in,
}) => {
  console.log(is_logged_in)
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="static"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Link
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            href="/"
            underline="none"
          >
            PTAG Library β
          </Link>
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
          {!is_logged_in ? (
            <Button
              href={new_user_path}
              color="secondary"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
            >
              Sign up
            </Button>
          ) : (
            <Button
              href={sessions_path}
              color="secondary"
              variant="outlined"
              sx={{ my: 1, mx: 1.5 }}
              data-method="delete"
            >
              Logout
            </Button>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('user-header')

  if (container && container.dataset.props) {
    Rails.start()

    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<UserHeader {...props} />)
  }
})
