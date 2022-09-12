import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Page } from '../../shared/page'
import { LoginForm } from '../../../shared/loginForm'

type IProps = {
  admin_sessions_path: string
  new_admin_librarian_path: string
}

const New: React.FC<IProps> = ({
  admin_sessions_path,
  new_admin_librarian_path,
}) => {
  return (
    <Page>
      <LoginForm
        postPath={admin_sessions_path}
        signUpPath={new_admin_librarian_path}
      />
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('librarian-session-new')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<New {...props} />)
  }
})
