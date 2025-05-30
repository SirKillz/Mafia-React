import "../../../css/night/actionFrames/enforcerActionFrame.css"

import { useNightContext } from "../../../contexts/NightContext"
import MafiaGame from "../../../GameAPI/mafiaGame";

function EnforcerActionFrame() {
    const {enforcedPlayers, removeEnforcedPlayer} = useNightContext();

    function handleRemoveEnforceClick(playerObj) {
        removeEnforcedPlayer(playerObj);
        const enforcedPlayer = MafiaGame.findPlayerByID(playerObj.id);
        enforcedPlayer.enableSpecialAction();
    }

    function getEnforcerInstructionText() {
        const enforcerPlayer = MafiaGame.findPlayerByRole("Enforcer");
        if (enforcerPlayer.isAlive) {
            return "Select a the player the Enforcer wishes to block from using their special ability."
        }
        else {
            return "The Enforcer is dead, and thus no actions can be performed!"
        }
    }


    return (
        <div className="enforcer-action-frame">
            <h2>Enforcer Actions:</h2>
            <p>{getEnforcerInstructionText()}</p>
            <h3>Player to be enforced:</h3>
            {enforcedPlayers.map(player => {
                return (
                    <div className="enforced-player-row" key={player.id}>
                        <p>{player.name}</p>
                        <button className="remove-enforce-button button-default" onClick={() => handleRemoveEnforceClick(player)}>Remove Enforcement</button>
                    </div>
                )
            })}
        </div>
    )
}

export default EnforcerActionFrame