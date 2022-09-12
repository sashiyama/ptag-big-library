import * as React from 'react'
import { createRoot } from 'react-dom/client'

import Avatar from '@mui/material/Avatar'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'

import { Page } from '../../shared/page'
import { Form, IFormState } from './form'

import { putRequest } from '../../../requests/fetch'
import { csrfToken } from '@rails/ujs'

type IProps = {
  admin_book_path: string
  genres: string[]
  subgenres: string[]
  book: IFormState
}

const Edit: React.FC<IProps> = ({
  admin_book_path,
  genres,
  subgenres,
  book,
}) => {
  const onSubmit = async (
    data: IFormState,
    failure: (res: { errors: string[] }) => void,
    success: (res: { redirect_to: string }) => void
  ) => {
    const token = csrfToken()

    if (token) {
      const res = await putRequest(admin_book_path, token, JSON.stringify(data))
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
              <EditIcon />
            </Avatar>
            <Typography component="h1" variant="h5">
              Edit the book
            </Typography>
          </>
        }
        genres={genres}
        subgenres={subgenres}
        onSubmit={onSubmit}
        submitButtonLabel="Update"
        defaultBook={book}
      />
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('librarian-book-edit')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<Edit {...props} />)
  }
})
