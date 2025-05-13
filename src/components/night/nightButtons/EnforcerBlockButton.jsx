import "../../../css/night/nightbuttons/enforcerBlockButton.css"

import { toast } from 'react-toastify'

import { useNightContext } from "../../../contexts/NightContext";
import MafiaGame from "../../../GameAPI/mafiaGame"

function EnforcerBlockButton({playerObj}) {
    const {enforcedPlayers, updateEnforcedPlayers} = useNightContext();

    function handleClick() {
        const enforcerPlayer = MafiaGame.findPlayerByRole("Enforcer");

        if (enforcerPlayer.isAlive) {
            
            // ensure an enforcement hasn't already been used this round
            if (enforcedPlayers.length === 0) {

                // finally check that this player wasn't previously enforced
                if (playerObj.id !== MafiaGame.previousEnforcerBlock) {
                        MafiaGame.disablePlayerAction(playerObj.id);
                        updateEnforcedPlayers(playerObj);
                    }
                else {
                    toast.error(`${playerObj.name} was enforced the previous round and cannot be enforced again this round!`)
                }
            }
            else {
                toast.warn(`Undo enforcement on: ${enforcedPlayers[0].name} to select someone else to enforce!`)
            }
        }
        
        else {
            toast.warn("The Enforcer is dead and thus cannot perform any actions!");
        }
    }


    return (
        <button className="enforcer-block-button" onClick={handleClick}>Enforce</button>
    )
}

export default EnforcerBlockButton