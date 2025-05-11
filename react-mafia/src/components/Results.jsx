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
                    break
                case "Mafia":
                    updateView("mafiaWin");
                    break
            }
        }
        updateView("daytime");
    }

    return (
        <div className="results">
            <h1 className="page-title">Night Results</h1>
            <h2>Deaths:</h2>
            <ul>
                {MafiaGame.lastNightRoutine.deaths.map(player => {
                    return <li>{player.name}</li>
                })}
            </ul>
            <h2>Silenced Player:</h2>
            <ul>
                <li>{MafiaGame.lastNightRoutine.silencedPlayer ? MafiaGame.lastNightRoutine.silencedPlayer.name: ""}</li>
            </ul>
            <button onClick={handleClick}>CONTINUE</button>
        </div>
    )
}

export default Results