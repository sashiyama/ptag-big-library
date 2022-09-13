import { useState } from 'react'
import { postRequest, deleteRequest } from '../../requests/fetch'
import { csrfToken } from '@rails/ujs'

import { IBook } from '../index'

export const useNotificationRequest = (
  url: string,
  booksState: IBook[],
  setBooksState: (books: IBook[]) => void
) => {
  const [errors, setErrors] = useState<string[]>([])

  const subscribe = async (bookId: string) => {
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
            newBook.is_subscribed_by_me = true
            newBook.notification_request_id = res.id
            return newBook
          } else {
            return book
          }
        })
        setBooksState(newBooks)
      }
    }
  }

  const unsubscribe = async (bookId: string, requestId: string) => {
    const token = csrfToken()

    if (token) {
      const res = await deleteRequest(`${url}/${requestId}`, token)
      if (res.errors) {
        setErrors(res.errors)
      } else {
        setErrors([])
        const newBooks = booksState.map((book) => {
          if (book.id === bookId) {
            const newBook = { ...book }
            newBook.is_subscribed_by_me = false
            return newBook
          } else {
            return book
          }
        })
        setBooksState(newBooks)
      }
    }
  }

  return { errors, subscribe, unsubscribe }
}
