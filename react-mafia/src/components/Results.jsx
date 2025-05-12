import "../css/results.css"

import MafiaGame from "../GameAPI/mafiaGame"
import { useNav } from "../contexts/NavContext"

function Results() {
    const {updateView} = useNav();

    function handleClick() {
        MafiaGame.calculateCounts();
        const results = MafiaGame.checkGameOver();

        if (results.isGameOver) {
            switch(results.winningTeam) {
                case "Innocent":
                    updateView("innocentWin");
                    return
                case "Mafia":
                    updateView("mafiaWin");
                    return
            }
        }
        updateView("daytime");
    }

    return (
        <div className="results">
            <h1 className="page-title">Night Results</h1>
            <div className="deaths">
                <h2>Deaths:</h2>
                <ul>
                    {
                        MafiaGame.lastNightRoutine.deaths.length > 0 
                        ?
                        MafiaGame.lastNightRoutine.deaths.map(player => {
                            return <li>{player.name}</li>
                        })
                        :
                        "No Deaths"
                    }
                </ul>
            </div>
            <div className="silenced">
                <h2>Silenced Player:</h2>
                <ul>
                    {MafiaGame.lastNightRoutine.silencedPlayer !== null ? <li>{MafiaGame.lastNightRoutine.silencedPlayer.name}</li> : "No Silences"}
                </ul>
            </div>
            <button onClick={handleClick} className="continue-button">CONTINUE</button>
        </div>
    )
}

export default Results