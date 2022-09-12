import * as React from 'react'
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

import { postRequest } from '../requests/fetch'
import { csrfToken } from '@rails/ujs'

type IProps = {
  postPath: string
  signUpPath: string
}

type IFormState = {
  email: string
  password: string
}

export const LoginForm: React.FC<IProps> = ({ postPath, signUpPath }) => {
  const [error, setError] = React.useState<string | null>(null)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormState>()
  const onSubmit = async (data: IFormState) => {
    const token = csrfToken()
    if (token) {
      const res = await postRequest(postPath, token, JSON.stringify(data))
      if (res.error) {
        setError(res.error)
      } else {
        setError(null)
        window.location.href = res.redirect_to
      }
    }
  }

  return (
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
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{ mt: 1, width: '380px' }}
      >
        {error && <Alert severity="error">{error}</Alert>}
        <Controller
          name="email"
          control={control}
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
                autoFocus
                error={!!errors['email']}
                helperText={errors['email'] ? errors['email'].message : ''}
              />
            )
          }}
        />
        <Controller
          name="password"
          control={control}
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
          LOGIN
        </LoadingButton>
        <Grid container>
          <Grid item xs>
            <Link href={signUpPath} variant="body2" color="inherit">
              Don't have an account? Sign Up
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Box>
  )
}
