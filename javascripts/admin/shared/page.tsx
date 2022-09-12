import * as React from 'react'

import { theme } from '../shared/adminTheme'

import { Copyright } from '../../shared/copyright'

import CssBaseline from '@mui/material/CssBaseline'
import Box from '@mui/material/Box'
import { ThemeProvider } from '@mui/material/styles'

export const Page: React.FC<{
  children: React.ReactChild
}> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <main>{children}</main>
      <Box sx={{ bgcolor: 'background.default', p: 6 }} component="footer">
        <Copyright />
      </Box>
    </ThemeProvider>
  )
}
