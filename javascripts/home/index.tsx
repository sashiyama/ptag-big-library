import * as React from 'react'
import { createRoot } from 'react-dom/client'
import { Page } from './page'

const Home = () => {
  return (
    <Page></Page>
  )
}

window.addEventListener('DOMContentLoaded', (event) => {
  const container = document.getElementById('home')
  const root = createRoot(container)
  root.render(<Home />);
})
