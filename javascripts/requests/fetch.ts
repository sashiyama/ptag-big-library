export const request = async (
  url: string,
  method: string,
  csrfToken: string,
  data?: string
) => {
  const contentBase = {
    method: method,
    mode: <RequestMode | undefined>'same-origin',
    redirect: <RequestRedirect | undefined>'follow',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: data,
  }

  const content = data ? { ...contentBase, ...{ body: data } } : contentBase

  const response = await fetch(url, content)
  return response.json()
}

export const postRequest = async (
  url: string,
  csrfToken: string,
  data: string
) => {
  return await request(url, 'post', csrfToken, data)
}

export const putRequest = async (
  url: string,
  csrfToken: string,
  data: string
) => {
  return await request(url, 'put', csrfToken, data)
}

export const deleteRequest = async (url: string, csrfToken: string) => {
  return await request(url, 'delete', csrfToken)
}
