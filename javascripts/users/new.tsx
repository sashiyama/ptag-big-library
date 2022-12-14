import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Page } from '../shared/page'
import { SignUpForm } from '../shared/signUpForm'

type IProps = {
  users_path: string
  new_session_path: string
}

const New: React.FC<IProps> = ({ users_path, new_session_path }) => {
  return (
    <Page>
      <SignUpForm postPath={users_path} loginPath={new_session_path} />
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('user-new')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<New {...props} />)
  }
})
