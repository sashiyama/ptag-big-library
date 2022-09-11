import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Page } from '../shared/page'
import { Index as BookIndex, IProps as IBookProps } from '../books/index'

import Avatar from '@mui/material/Avatar'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

type IProps = {
  name: string
  email: string
}

const Mypage: React.FC<{
  profile_props: IProps
  book_props: IBookProps
}> = ({ profile_props, book_props }) => {
  return (
    <Page>
      <>
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            {profile_props.name[0]}
          </Avatar>
          <Typography component="h1" variant="h5">
            {profile_props.name}
          </Typography>
          <Typography component="h2" variant="h6">
            {profile_props.email}
          </Typography>
        </Box>
        <BookIndex {...{ ...{ title: 'My Bookshelf' }, ...book_props }} />
      </>
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('mypage')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<Mypage {...props} />)
  }
})
