import "../css/gameOver.css"

import MafiaGame from "../GameAPI/mafiaGame"
import { useNav } from "../contexts/NavContext"

function MafiaWin() {
    const {updateView} = useNav();

    function handleReset() {
        MafiaGame.resetGame();
        updateView("roleEntry");
    }

    return <div className="game-over mafia-win">
        <h1 className="winning-team">MAFIA WIN!</h1>
        <button onClick={handleReset} className="button-default">Reset</button>
    </div>
}

export default MafiaWin