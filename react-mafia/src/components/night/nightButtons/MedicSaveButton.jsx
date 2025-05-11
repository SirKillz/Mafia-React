import "../../../css/night/nightbuttons/medicSaveButton.css"

import { toast } from 'react-toastify'

import { useNightContext } from "../../../contexts/NightContext";
import MafiaGame from "../../../GameAPI/mafiaGame"

function MedicSaveButton({playerObj}) {
    const {savedPlayers, updateSavedPlayers} = useNightContext();

    function handleClick() {
        const medicPlayer = MafiaGame.findPlayerByRole("Medic");

        if (medicPlayer.isAlive) {
            
            // ensure the medic has not been blocked by the enforcer
            if (medicPlayer.canPerformAction) {
                // ensure a medic save hasn't already been used this round
                if (savedPlayers.length === 0) {

                    // finally check that this player wasn't previously saved
                    if (playerObj.id !== MafiaGame.previousMedicSave) {
                            updateSavedPlayers(playerObj)
                        }
                    else {
                        toast.error(`${playerObj.name} was saved the previous round and cannot be saved again this round!`)
                    }
                }
                else {
                    toast.warn(`Undo save on: ${savedPlayers[0].name} to select someone else to save!`)
                }
            }
            else {
                toast.error("The medic has been Enforced and thus no actions can be performed!");
            }
        }
        
        else {
            toast.warn("The Medic is dead and thus cannot perform any actions!");
        }
    }


    return (
        <button className="medic-save-button" onClick={handleClick}>Save</button>
    )
}

export default MedicSaveButton