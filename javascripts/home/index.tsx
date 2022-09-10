import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Page } from '../shared/page'
import { Index as BookIndex, IProps as IBookProps } from '../books/index'

const Home: React.FC<IBookProps> = (props) => {
  return (
    <Page>
      <BookIndex {...props} />
    </Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('home')

  if (container && container.dataset.props) {
    const root = createRoot(container)
    const props = JSON.parse(container.dataset.props)
    root.render(<Home {...props} />)
  }
})
