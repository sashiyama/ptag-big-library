import * as React from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Link from '@mui/material/Link'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

import { useBorrow } from './hooks/useBorrow'
import { useReturn } from './hooks/useReturn'

export type IProps = {
  title: string
  books: IBook[]
  is_logged_in: boolean
  pages: number
  page: number
  total_count: number
  checked_out_books_path: string
  returned_books_path: string
}

type IBook = {
  id: string
  title: string
  author: string | null
  genre: string
  subgenre: string
  pages: number
  publisher: string | null
  is_borrowed_by_others: boolean
  is_borrowed_by_me: boolean
}

const ButtonLabel = (book: IBook) => {
  if (book.is_borrowed_by_others) {
    return 'Borrowed'
  } else if (book.is_borrowed_by_me) {
    return 'Return'
  } else {
    return 'Borrow'
  }
}

export const Index: React.FC<IProps> = ({
  title,
  books,
  is_logged_in,
  pages,
  page,
  total_count,
  checked_out_books_path,
  returned_books_path,
}) => {
  const { borrow, errors: borrowErrors } = useBorrow(checked_out_books_path)
  const { giveBack, errors: returnErrors } = useReturn(returned_books_path)

  if (borrowErrors.length > 0 || returnErrors.length > 0) {
    console.error(borrowErrors)
    console.error(returnErrors)
  }

  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Typography component="h3" variant="h5">
        {title} ({total_count})
      </Typography>
      <Grid container spacing={2} sx={{ marginTop: 1 }}>
        {books.map((book) => (
          <Grid item xs={4} key={book.id}>
            <Card
              sx={{ minWidth: 275, bgcolor: 'primary.main' }}
              variant="outlined"
            >
              <CardContent>
                <Typography
                  sx={{ fontSize: 14 }}
                  color="text.secondary"
                  gutterBottom
                >
                  {book.genre} &gt; {book.subgenre}
                </Typography>
                <Typography variant="h5" component="div">
                  {book.title}
                </Typography>
                <Typography sx={{ mb: 1.5 }} color="text.secondary">
                  {book.author || 'unknown'} - {book.publisher || 'unknown'}
                </Typography>
                <Typography variant="body2">pages: {book.pages}</Typography>
              </CardContent>
              <CardActions>
                <Button
                  size="small"
                  color={book.is_borrowed_by_me ? 'warning' : 'secondary'}
                  disabled={!is_logged_in || book.is_borrowed_by_others}
                  variant="outlined"
                  onClick={() => {
                    if (book.is_borrowed_by_me) {
                      giveBack(book.id)
                    } else {
                      borrow(book.id)
                    }
                  }}
                >
                  {ButtonLabel(book)}
                </Button>
                <Link href={`/books/${book.id}`} sx={{ marginLeft: 1 }}>
                  <Button size="small" color="secondary">
                    Learn More
                  </Button>
                </Link>
              </CardActions>
            </Card>
          </Grid>
        ))}
        <Grid item xs={12} sx={{ justifyContent: 'center', display: 'flex' }}>
          <Pagination
            count={pages}
            variant="outlined"
            color="secondary"
            page={page}
            onChange={(e, page) => {
              window.location.href = `?page=${page}`
            }}
          />
        </Grid>
      </Grid>
    </Container>
  )
}
