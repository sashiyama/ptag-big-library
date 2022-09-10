export const postRequest = async (
  url: string,
  csrfToken: string,
  data: string
) => {
  const response = await fetch(url, {
    method: 'POST',
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
