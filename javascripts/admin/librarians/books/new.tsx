import * as React from 'react'
import { createRoot } from 'react-dom/client'

import Avatar from '@mui/material/Avatar'
import SaveAsIcon from '@mui/icons-material/SaveAs'
import Typography from '@mui/material/Typography'

import { Page } from '../../shared/page'
import { Form, IFormState } from './form'

import { ILibrary } from './types/library'

import { postRequest } from '../../../requests/fetch'
import { csrfToken } from '@rails/ujs'

type IProps = {
  admin_books_path: string
  genres: string[]
  subgenres: string[]
  libraries: ILibrary[]
}

const New: React.FC<IProps> = ({
  admin_books_path,
  genres,
  subgenres,
  libraries,
}) => {
  const onSubmit = async (
    data: IFormState,
    failure: (res: { errors: string[] }) => void,
    success: (res: { redirect_to: string }) => void
  ) => {
    const token = csrfToken()

    if (token) {
      const res = await postRequest(
        admin_books_path,
        token,
        JSON.stringify(data)
      )
      if (res.errors) {
        failure(res)
      } else {
        success(res)
      }
    }
  }

  return (
    <Page>
      <Form
        pageTitle={
          <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
              <SaveAsIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Add a new book
            </Typography>
          </>
        }
        genres={genres}
        subgenres={subgenres}
        libraries={libraries}
        onSubmit={onSubmit}
        submitButtonLabel="Add"
      />
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('librarian-book-new')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<New {...props} />)
  }
})
