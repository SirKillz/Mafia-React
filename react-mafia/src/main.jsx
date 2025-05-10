import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './css/index.css'
import App from './App.jsx'
import { NavProvider } from './contexts/NavContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <NavProvider>
      <App />
    </NavProvider>
  </StrictMode>,
)
