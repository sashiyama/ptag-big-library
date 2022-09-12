import * as React from 'react'
import { useForm, Controller } from 'react-hook-form'

import Alert from '@mui/material/Alert'
import TextField from '@mui/material/TextField'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'
import Link from '@mui/material/Link'
import LoadingButton from '@mui/lab/LoadingButton'
import Grid from '@mui/material/Grid'
import CircularProgress from '@mui/material/CircularProgress'
import InputLabel from '@mui/material/InputLabel'
import MenuItem from '@mui/material/MenuItem'
import FormHelperText from '@mui/material/FormHelperText'
import FormControl from '@mui/material/FormControl'
import Select from '@mui/material/Select'
import OutlinedInput from '@mui/material/OutlinedInput'

import { IBook } from './index'

type IProps = {
  pageTitle: JSX.Element
  genres: string[]
  subgenres: string[]
  onSubmit: (
    data: IFormState,
    failure: (res: { errors: string[] }) => void,
    success: (res: { redirect_to: string }) => void
  ) => void
  submitButtonLabel: string
  defaultBook?: IFormState
}

export type IFormState = Omit<IBook, 'id' | 'edit_admin_book_path'>

export const Form: React.FC<IProps> = ({
  pageTitle,
  genres,
  subgenres,
  onSubmit,
  submitButtonLabel,
  defaultBook,
}) => {
  const [serverErrors, setServerErrors] = React.useState<string[]>([])
  const [genreNotch, setGenreNotch] = React.useState<boolean>(false)
  const [subgenreNotch, setSubgenreNotch] = React.useState<boolean>(false)

  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IFormState>()

  // make onSubmit, a submit button label and title props
  return (
    <Box
      sx={{
        marginTop: 1,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      {pageTitle}
      <Box
        component="form"
        onSubmit={handleSubmit((data: IFormState) => {
          onSubmit(
            data,
            (res: { errors: string[] }) => {
              setServerErrors(res.errors)
            },
            (res: { redirect_to: string }) => {
              setServerErrors([])
              window.location.href = res.redirect_to
            }
          )
        })}
        sx={{ mt: 1, width: '380px' }}
      >
        {serverErrors.map((error) => (
          <Alert severity="error">{error}</Alert>
        ))}
        <Controller
          name="title"
          control={control}
          rules={{
            required: { value: true, message: 'Please enter title' },
          }}
          defaultValue={defaultBook ? defaultBook.title : ''}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                margin="normal"
                required
                fullWidth
                id="title"
                label="Title"
                color="secondary"
                autoFocus
                error={!!errors['title']}
                helperText={errors['title'] ? errors['title'].message : ''}
              />
            )
          }}
        />
        <Controller
          name="author"
          control={control}
          defaultValue={defaultBook ? defaultBook.author : ''}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="author"
                label="Author"
                color="secondary"
                error={!!errors['author']}
                helperText={errors['author'] ? errors['author'].message : ''}
              />
            )
          }}
        />
        <Controller
          name="genre"
          control={control}
          defaultValue={defaultBook ? defaultBook.genre : ''}
          rules={{
            required: { value: true, message: 'Please select genre' },
          }}
          render={({ field }) => {
            return (
              <FormControl
                sx={{ mt: 2, mb: 1, minWidth: '100%' }}
                error={!!errors['genre']}
                color="secondary"
                required
              >
                <InputLabel>Genre</InputLabel>
                <Select
                  {...field}
                  required
                  input={<OutlinedInput label="Genre" notched={genreNotch} />}
                  onOpen={() => {
                    setGenreNotch(true)
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {genres.map((genre) => (
                    <MenuItem key={`genre-${genre}`} value={genre}>
                      {genre}
                    </MenuItem>
                  ))}
                </Select>
                {errors['genre'] && (
                  <FormHelperText>{errors['genre'].message}</FormHelperText>
                )}
              </FormControl>
            )
          }}
        />
        <Controller
          name="subgenre"
          control={control}
          defaultValue={defaultBook ? defaultBook.subgenre : ''}
          rules={{
            required: { value: true, message: 'Please select sub genre' },
          }}
          render={({ field }) => {
            return (
              <FormControl
                sx={{ mt: 2, minWidth: '100%' }}
                error={!!errors['subgenre']}
                color="secondary"
                required
              >
                <InputLabel>Sub Genre</InputLabel>
                <Select
                  {...field}
                  required
                  input={
                    <OutlinedInput label="Sub Genre" notched={subgenreNotch} />
                  }
                  onOpen={() => {
                    setSubgenreNotch(true)
                  }}
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {subgenres.map((subgenre) => (
                    <MenuItem key={`subgenre-${subgenre}`} value={subgenre}>
                      {subgenre}
                    </MenuItem>
                  ))}
                </Select>
                {errors['subgenre'] && (
                  <FormHelperText>{errors['subgenre'].message}</FormHelperText>
                )}
              </FormControl>
            )
          }}
        />
        <Controller
          name="pages"
          control={control}
          rules={{
            required: { value: true, message: 'Please enter number of pages' },
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: 'Please enter only digits',
            },
          }}
          defaultValue={defaultBook ? defaultBook.pages : 0}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                type="number"
                margin="normal"
                required
                fullWidth
                id="pages"
                label="Number of pages"
                color="secondary"
                error={!!errors['pages']}
                helperText={errors['pages'] ? errors['pages'].message : ''}
              />
            )
          }}
        />
        <Controller
          name="publisher"
          control={control}
          defaultValue={defaultBook ? defaultBook.publisher : ''}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                margin="normal"
                fullWidth
                id="publisher"
                label="Publisher"
                color="secondary"
                error={!!errors['publisher']}
                helperText={
                  errors['publisher'] ? errors['publisher'].message : ''
                }
              />
            )
          }}
        />
        <Controller
          name="copies"
          control={control}
          rules={{
            required: { value: true, message: 'Please enter number of copies' },
            pattern: {
              value: /^(0|[1-9]\d*)(\.\d+)?$/,
              message: 'Please enter only digits',
            },
          }}
          defaultValue={defaultBook ? defaultBook.copies : ''}
          render={({ field }) => {
            return (
              <TextField
                {...field}
                type="number"
                margin="normal"
                required
                fullWidth
                id="copies"
                label="Number of copies"
                color="secondary"
                error={!!errors['copies']}
                helperText={errors['copies'] ? errors['copies'].message : ''}
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
          {submitButtonLabel}
        </LoadingButton>
      </Box>
    </Box>
  )
}
