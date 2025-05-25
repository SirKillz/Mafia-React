import './css/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './App.jsx'
import { NavProvider } from './contexts/NavContext.jsx'

import Stats from './Stats.jsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: 
      <NavProvider>
        <App />
      </NavProvider>
  },
  {
    path: "/stats",
    element: <Stats />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
