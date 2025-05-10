import "../css/night/medicActionFrame.css"

import { useNightContext } from "../contexts/NightContext"
import MafiaGame from "../GameAPI/mafiaGame";

function MedicActionFrame() {
    const {savedPlayers, removeSavedPlayer} = useNightContext();

    function handleClick(playerObj) {
        removeSavedPlayer(playerObj);
    }

    function getMedicInstructionText() {
        const medicPlayer = MafiaGame.findPlayerByRole("Medic");


        if (medicPlayer.isAlive) {
            if (medicPlayer.canPerformAction) {
                return "Select the player the Medic wishes to save during the night."
            }
            else {
                return "The Medic has been blocked by the Enforcer, and thus no actions can be performed."
            }
        }
        else {
            return "The Medic is dead, and thus no actions can be performed!"
        }
    }


    return (
        <div className="medic-action-frame">
            <h2>Medic Actions:</h2>
            <p>{getMedicInstructionText()}</p>
            <h3>Player to be saved:</h3>
            {savedPlayers.map(player => {
                return (
                    <div className="saved-player-row" key={player.id}>
                        <p>{player.name}</p>
                        <button className="remove-save-button" onClick={() => handleClick(player)}>Remove Save</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MedicActionFrame