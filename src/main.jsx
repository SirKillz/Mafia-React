import './css/index.css'

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router'

import App from './Pages/App.jsx'
import { NavProvider } from './contexts/NavContext.jsx'

import Stats from './Pages/Stats.jsx'
import PlayerStats from './Pages/PlayerStats.jsx'

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
  },
  {
    path: "/stats/player/:playerId",
    element: <PlayerStats />
  }
])

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
)
