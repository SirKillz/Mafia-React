import "../css/night/bossActionFrame.css"

import { useNightContext } from "../contexts/NightContext"
import MafiaGame from "../GameAPI/mafiaGame";

function BossActionFrame() {
    const {silencedPlayers, removeSilencedPlayer} = useNightContext();

    function handleClick(playerObj) {
        removeSilencedPlayer(playerObj);
    }

    function getBossInstructionText() {
        const bossPlayer = MafiaGame.findPlayerByRole("Mafia Boss");
        if (bossPlayer.isAlive) {
            return "Select a the player the Boss wishes to silence."
        }
        else {
            return "The Mafia Boss is dead, and thus no actions can be performed!"
        }
    }


    return (
        <div className="boss-action-frame">
            <h2>Mafia Boss Actions:</h2>
            <p>{getBossInstructionText()}</p>
            <p>After a player is selected, walk around and tap them</p>
            <h3>Player to be silenced:</h3>
            {silencedPlayers.map(player => {
                return (
                    <div className="silenced-player-row" key={player.id}>
                        <p>{player.name}</p>
                        <button className="remove-silence-button" onClick={() => handleClick(player)}>Remove Silence</button>
                    </div>
                )
            })}
        </div>
    )
}

export default BossActionFrame