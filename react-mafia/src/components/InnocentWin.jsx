import "../css/gameOver.css"

import MafiaGame from "../GameAPI/mafiaGame"
import { useNav } from "../contexts/NavContext"

function InnocentWin() {
    const {updateView} = useNav();

    function handleReset() {
            MafiaGame.resetGame();
            updateView("roleEntry");
    }

    return <div className="game-over innocent-win">
        <h1 className="winning-team">INNOCENT WIN!</h1>
        <button onClick={handleReset} className="button-default">Reset</button>
    </div>
}

export default InnocentWin