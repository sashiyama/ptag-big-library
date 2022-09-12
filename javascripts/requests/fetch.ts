export const request = async (
  url: string,
  method: string,
  csrfToken: string,
  data: string
) => {
  const response = await fetch(url, {
    method: method,
    mode: 'same-origin',
    redirect: 'follow',
    headers: {
      'Content-Type': 'application/json',
      'X-CSRF-Token': csrfToken,
    },
    body: data,
  })
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
