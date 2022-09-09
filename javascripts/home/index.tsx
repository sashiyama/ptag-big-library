import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Page } from '../shared/page'

const Home = () => {
  return <Page>Home</Page>
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('home')

  if (container) {
    const root = createRoot(container)
    root.render(<Home />)
  }
})
