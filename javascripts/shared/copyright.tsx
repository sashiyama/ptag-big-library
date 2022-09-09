import * as React from 'react'

import GitHubIcon from '@mui/icons-material/GitHub'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'

export const Copyright = () => {
  return (
    <Typography variant="body2" color="inherit" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://github.com/sashiyama">
        <GitHubIcon sx={{ fontSize: 16, verticalAlign: 'sub' }} /> Yoshi
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  )
}
