import { useState } from 'react'
import { postRequest } from '../../requests/fetch'
import { csrfToken } from '@rails/ujs'

export const useBorrow = (url: string) => {
  const [errors, setErrors] = useState<string[]>([])

  const borrow = async (bookId: string) => {
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
        window.location.href = res.redirect_to
      }
    }
  }

  return { borrow, errors }
}
