import { useState } from 'react'
import { postRequest } from '../../requests/fetch'
import { csrfToken } from '@rails/ujs'

import { IBook } from '../index'

export const useReturn = (
  url: string,
  booksState: IBook[],
  setBooksState: (books: IBook[]) => void
) => {
  const [errors, setErrors] = useState<string[]>([])

  const giveBack = async (bookId: string) => {
    const token = csrfToken()

    if (token) {
      const res = await postRequest(
        url,
        token,
        JSON.stringify({ book_id: bookId })
      )
      if (res.errors) {
        setErrors(res.errors)
      } else {
        setErrors([])
        const newBooks = booksState.map((book) => {
          if (book.id === bookId) {
            const newBook = { ...book }
            newBook.is_borrowed_by_me = false
            return newBook
          } else {
            return book
          }
        })
        setBooksState(newBooks)
      }
    }
  }

  return { giveBack, errors }
}
