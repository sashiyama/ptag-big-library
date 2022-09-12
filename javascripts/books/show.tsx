import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Page } from '../shared/page'
import { BookHistoryTable } from '../books/bookHistoryTable'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type IBook = {
  id: string
  title: string
  author: string | null
  genre: string
  subgenre: string
  pages: number
  publisher: string | null
  history: IHistory[]
  copies: number
  num_of_books_on_loan: number
}

export type IHistory = {
  id: string
  checked_out_at: string
  returned_at: string
  username: string
}

type IProps = {
  book: IBook
  pages: number
  page: number
}

const Show: React.FC<IProps> = ({ book, pages, page }) => {
  return (
    <Page>
      <>
        <Box
          sx={{
            marginTop: 6,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.light' }}>
            {book.title[0]}
          </Avatar>
          <Typography component="h3" variant="h6">
            {book.genre} &gt; {book.subgenre}
          </Typography>
          <Typography component="h1" variant="h4">
            {book.title}
          </Typography>
          <Typography component="h2" variant="h5">
            {book.author || 'unknown'} - {book.publisher || 'unknown'}
          </Typography>
          <Typography
            component="h4"
            variant="subtitle2"
            color={book.copies === book.num_of_books_on_loan ? 'red' : 'green'}
          >
            ON LOAN: {book.num_of_books_on_loan} (TOTAL: {book.copies})
          </Typography>
          <BookHistoryTable history={book.history} pages={pages} page={page} />
        </Box>
      </>
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('book-show')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<Show {...props} />)
  }
})
