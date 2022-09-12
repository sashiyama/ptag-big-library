import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { theme } from './adminTheme'

import AppBar from '@mui/material/AppBar'
import CssBaseline from '@mui/material/CssBaseline'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import { ThemeProvider } from '@mui/material/styles'

import * as Rails from '@rails/ujs'

type IProps = {
  new_admin_sessions_path: string
  admin_sessions_path: string
  is_logged_in: boolean
  name: string
}

const AdminHeader: React.FC<IProps> = ({
  new_admin_sessions_path,
  admin_sessions_path,
  is_logged_in,
  name,
}) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar
        position="sticky"
        elevation={0}
        sx={{ borderBottom: (theme) => `1px solid ${theme.palette.divider}` }}
      >
        <Toolbar sx={{ flexWrap: 'wrap' }}>
          <Link
            variant="h6"
            color="inherit"
            noWrap
            sx={{ flexGrow: 1 }}
            href="#"
            underline="none"
          >
            PTAG Library β for Librarians
          </Link>
          {!is_logged_in ? (
            <Button
              href={new_admin_sessions_path}
              color="secondary"
              variant="contained"
              sx={{ my: 1, mx: 1.5 }}
            >
              Login
            </Button>
          ) : (
            <>
              {name}
              <Button
                href={admin_sessions_path}
                color="secondary"
                variant="contained"
                sx={{ my: 1, mx: 1.5 }}
                data-method="delete"
              >
                Logout
              </Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </ThemeProvider>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('admin-header')

  if (container && container.dataset.props) {
    Rails.start()

    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<AdminHeader {...props} />)
  }
})
