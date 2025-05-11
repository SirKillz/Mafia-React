import { useNav } from "../../contexts/NavContext"
import { useDayContext } from "../../contexts/DayContext";

import MafiaGame from "../../GameAPI/mafiaGame";

function DayPhaseButton({text, className}) {
    const { updateView } = useNav();
    const { votedPlayers } = useDayContext();

    function onClick() {
        MafiaGame.performDayRoutine(votedPlayers);
        const gameResult = MafiaGame.checkGameOver();
        if (gameResult.isGameOver) {
            switch(gameResult.winningTeam) {
                case "Innocent":
                    updateView("innocentWin");
                    break
                case "Mafia":
                    updateView("mafiaWin");
                    break
            }
        }
        else {
            updateView("nightTime");
        }
    }

    return (
        <button 
            className={className}
            onClick={onClick}
        >
            {text}
        </button>
    )
}

export default DayPhaseButton