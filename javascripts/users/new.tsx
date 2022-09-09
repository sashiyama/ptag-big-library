import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { useForm, Controller } from 'react-hook-form'

import Avatar from '@mui/material/Avatar'
import LockOutlinedIcon from '@mui/icons-material/LockOutlined'
import Button from '@mui/material/Button'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import Grid from '@mui/material/Grid'

import { Page } from '../shared/page'

import { csrfToken } from '@rails/ujs'

type IFormState = {
  name: string
  email: string
  password: string
}

const New = () => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<IFormState>()
  const onSubmit = (data: IFormState) => {
    console.log(data)
    console.log(csrfToken())
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
          <Button
            variant="contained"
            type="submit"
            fullWidth
            color="secondary"
            sx={{ mt: 3, mb: 2 }}
          >
            SIGN UP
          </Button>
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

  if (container) {
    const root = createRoot(container)
    root.render(<New />)
  }
})
