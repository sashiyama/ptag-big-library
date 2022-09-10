import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm, Controller } from 'react-hook-form'

import Alert from '@mui/material/Alert'
import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'

import { Page } from '../shared/page'

import { postRequest } from '../requests/fetch'
import { csrfToken } from '@rails/ujs'

type IFormState = {
  name: string
  email: string
  password: string
}

const New: React.FC<{
  usersPath: string
}> = ({ usersPath }) => {
  const [serverErrors, setServerErrors] = React.useState<string[]>([])
  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormState>()
  const onSubmit = async (data: IFormState) => {
    const token = csrfToken()
    if (token) {
      const res = await postRequest(usersPath, token, JSON.stringify(data))
      if (res.errors) {
        setServerErrors(res.errors)
      } else {
        setServerErrors([])
        window.location.href = res.redirect_to
      }
    }
  }

  return (
    <Page>
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign up
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{ mt: 1, width: '380px' }}
        >
          {serverErrors.length > 0 && (
            <Alert severity="error">{serverErrors.join(',')}</Alert>
          )}
          <Controller
            name="name"
            control={control}
            rules={{
              required: { value: true, message: 'Please enter your name' },
              maxLength: {
                value: 50,
                message: 'Please enter your name within 50 charactors',
              },
            }}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="name"
                  label="Name"
                  color="secondary"
                  autoFocus
                  error={!!errors['name']}
                  helperText={errors['name'] ? errors['name'].message : ''}
                />
              )
            }}
          />
          <Controller
            name="email"
            control={control}
            rules={{
              pattern: {
                value: /^[\w+\-.]+@[a-z\d\-.]+\.[a-z]+$/i,
                message: 'Please enter in the format: name@example.com',
              },
            }}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  id="email"
                  label="Email Address"
                  color="secondary"
                  autoComplete="email"
                  error={!!errors['email']}
                  helperText={errors['email'] ? errors['email'].message : ''}
                />
              )
            }}
          />
          <Controller
            name="password"
            control={control}
            rules={{
              minLength: {
                value: 6,
                message:
                  'Please enter your password greather than 6 charactors',
              },
            }}
            defaultValue=""
            render={({ field }) => {
              return (
                <TextField
                  {...field}
                  margin="normal"
                  required
                  fullWidth
                  type="password"
                  id="password"
                  label="Password"
                  color="secondary"
                  error={!!errors['password']}
                  helperText={
                    errors['password'] ? errors['password'].message : ''
                  }
                />
              )
            }}
          />
          <LoadingButton
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            disabled={isSubmitting}
            loading={isSubmitting}
            loadingIndicator={<CircularProgress color="secondary" size={18} />}
            sx={{ mt: 3, mb: 2 }}
          >
            SIGN UP
          </LoadingButton>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2" color="inherit">
                Do you have an account? Sign In
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('user-new')

  if (container && container.dataset.usersPath) {
    const root = createRoot(container)
    root.render(<New usersPath={container.dataset.usersPath} />)
  }
})
