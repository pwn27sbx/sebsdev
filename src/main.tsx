import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'

/* Self-hosted Anton Font (local, no Google CDN) */
import './assets/fonts/fonts.css'

const root = document.getElementById('root')
if (root) {
  createRoot(root).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
}
