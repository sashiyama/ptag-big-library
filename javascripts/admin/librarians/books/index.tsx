import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Page } from '../../shared/page'

import Paper from '@mui/material/Paper'

import { BookTable } from './table'

export type IBook = {
  id: string
  title: string
  author: string | null
  genre: string
  subgenre: string
  pages: number
  publisher: string | null
  copies: string
  edit_admin_book_path: string
}

type IProps = {
  books: IBook[]
  total_pages: number
  current_page: number
  new_admin_book_path: string
}

const Index: React.FC<IProps> = (props) => {
  return (
    <Page>
      <Paper
        elevation={3}
        sx={{ p: 2, display: 'flex', flexDirection: 'column', margin: 2 }}
      >
        <BookTable {...props} />
      </Paper>
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('librarian-book-index')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<Index {...props} />)
  }
})
