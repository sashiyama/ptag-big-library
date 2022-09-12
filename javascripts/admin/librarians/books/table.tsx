import * as React from 'react'

import { IBook } from './index'

import Link from '@mui/material/Link'
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Typography from '@mui/material/Typography'
import Pagination from '@mui/material/Pagination'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import EditIcon from '@mui/icons-material/Edit'
import AddIcon from '@mui/icons-material/Add'

type IProps = {
  books: IBook[]
  total_pages: number
  current_page: number
  new_admin_book_path: string
}

export const BookTable: React.FC<IProps> = ({
  books,
  total_pages,
  current_page,
  new_admin_book_path,
}) => {
  return (
    <React.Fragment>
      <Box sx={{ flexGrow: 1 }}>
        <Toolbar>
          <Typography
            component="h2"
            variant="h6"
            color="primary"
            gutterBottom
            sx={{ flexGrow: 1 }}
          >
            Books
          </Typography>
          <Link
            color="primary"
            href={new_admin_book_path}
            sx={{ mt: 3 }}
            underline="none"
          >
            <AddIcon sx={{ fontSize: 16, verticalAlign: 'text-top' }} /> Add a
            new book
          </Link>
        </Toolbar>
      </Box>
      <Table size="small" stickyHeader={true}>
        <TableHead>
          <TableRow hover={true} selected={true}>
            <TableCell>ID</TableCell>
            <TableCell>Title</TableCell>
            <TableCell>Author</TableCell>
            <TableCell>Genre</TableCell>
            <TableCell>Sub genre</TableCell>
            <TableCell>Pages</TableCell>
            <TableCell>Publisher</TableCell>
            <TableCell>Copies</TableCell>
            <TableCell />
          </TableRow>
        </TableHead>
        <TableBody>
          {books.map((book) => (
            <TableRow key={book.id}>
              <TableCell>{book.id}</TableCell>
              <TableCell>{book.title}</TableCell>
              <TableCell>{book.author || 'unknown'}</TableCell>
              <TableCell>{book.genre}</TableCell>
              <TableCell>{book.subgenre}</TableCell>
              <TableCell>{book.pages}</TableCell>
              <TableCell>{book.publisher || 'unknown'}</TableCell>
              <TableCell>{book.copies}</TableCell>
              <TableCell>
                <Link
                  color="primary"
                  href={book.edit_admin_book_path}
                  sx={{ mt: 3 }}
                >
                  <EditIcon />
                </Link>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Box
        sx={{
          marginTop: 1,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Pagination
          count={total_pages}
          variant="outlined"
          color="secondary"
          page={current_page}
          onChange={(e, page) => {
            window.location.href = `?page=${page}`
          }}
        />
      </Box>
    </React.Fragment>
  )
}
