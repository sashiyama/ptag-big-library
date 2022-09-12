import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Page } from '../shared/page'
import { LoginForm } from '../shared/loginForm'

type IProps = {
  sessions_path: string
  new_user_path: string
}

const New: React.FC<IProps> = ({ sessions_path, new_user_path }) => {
  return (
    <Page>
      <LoginForm postPath={sessions_path} signUpPath={new_user_path} />
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('session-new')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<New {...props} />)
  }
})
