import "../../../css/night/enforcerBlockButton.css"

import { toast } from 'react-toastify'

import { useNightContext } from "../../../contexts/NightContext";
import MafiaGame from "../../../GameAPI/mafiaGame"

function BossSilenceButton({playerObj}) {
    const {silencedPlayers, updateSilencedPlayers} = useNightContext();

    function handleClick() {
        const bossPlayer = MafiaGame.findPlayerByRole("Mafia Boss");

        if (bossPlayer.isAlive) {
            
            // ensure a silence hasn't already been used this round
            if (silencedPlayers.length === 0) {

                // finally check that this player wasn't previously silenced
                if (playerObj.id !== MafiaGame.previousBossSilence) {
                        updateSilencedPlayers(playerObj);
                    }
                else {
                    toast.error(`${playerObj.name} was silenced the previous round and cannot be silenced again this round!`)
                }
            }
            else {
                toast.warn(`Undo silence on: ${silencedPlayers[0].name} to select someone else to silence!`)
            }
        }
        
        else {
            toast.warn("The Mafia Boss is dead and thus cannot perform any actions!");
        }
    }


    return (
        <button className="enforcer-block-button" onClick={handleClick}>Silence</button>
    )
}

export default BossSilenceButton