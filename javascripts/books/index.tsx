import * as React from 'react'

import Container from '@mui/material/Container'
import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardActions from '@mui/material/CardActions'
import CardContent from '@mui/material/CardContent'
import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'

export type IProps = {
  books: IBook[]
  is_logged_in: boolean
  pages: number
  page: number
}

type IBook = {
  id: string
  title: string
  author: string | null
  genre: string
  subgenre: string
  pages: number
  publisher: string | null
}

export const Index: React.FC<IProps> = ({
  books,
  is_logged_in,
  pages,
  page,
}) => {
  return (
    <Container maxWidth="md" sx={{ marginTop: 4 }}>
      <Grid container spacing={2}>
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
                  {book.genre} - {book.subgenre}
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
                  color="secondary"
                  disabled={!is_logged_in}
                  variant="outlined"
                >
                  Borrow
                </Button>
                <Button size="small" color="secondary">
                  Learn More
                </Button>
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
