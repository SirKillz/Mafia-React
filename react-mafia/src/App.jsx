import { useNav } from './contexts/NavContext'
import { ToastContainer } from 'react-toastify';

import WelcomePage from './components/Welcome'
import PlayerEntry from './components/PlayerEntry';
import RoleEntry from './components/RoleEntry';
import Daytime from './components/DayTime';
import { DayProvider } from './contexts/DayContext';
import Night from './components/Night';
import { NightProvider } from './contexts/NightContext';
import InnocentWin from './components/InnocentWin';
import MafiaWin from './components/MafiaWin';

function App() {
  const { view } = useNav();

  function renderView() {
    switch(view) {
      case "welcome":
        return <WelcomePage />

      case "playerEntry":
        return <PlayerEntry />

      case "roleEntry":
        return <RoleEntry />
      
      case "daytime":
        return (
          <DayProvider>
            <Daytime />
          </DayProvider>
        )

      case "nightTime":
        return (
          <NightProvider>
            <Night /> 
          </NightProvider>
          
        )

      case "innocentWin":
        return <InnocentWin />
      
      case "mafiaWin":
        return <MafiaWin />
    }
  }

  return (
    <>
      {renderView()}
      <ToastContainer 
        position='top-center'
        autoClose={8000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="dark"
      />
    </>
  )
}

export default App
