import * as React from 'react'
import { createRoot } from 'react-dom/client'

import { Page } from '../shared/page'
import { SignUpForm } from '../../shared/signUpForm'

type IProps = {
  admin_librarians_path: string
  new_admin_sessions_path: string
}

const New: React.FC<IProps> = ({
  admin_librarians_path,
  new_admin_sessions_path,
}) => {
  return (
    <Page>
      <SignUpForm
        postPath={admin_librarians_path}
        loginPath={new_admin_sessions_path}
      />
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('librarian-new')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<New {...props} />)
  }
})
