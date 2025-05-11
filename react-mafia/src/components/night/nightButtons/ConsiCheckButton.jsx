import "../../../css/night/nightbuttons/consiCheckButton.css"

import { toast } from 'react-toastify'

import MafiaGame from "../../../GameAPI/mafiaGame"
import { useNightContext } from "../../../contexts/NightContext";

function ConsiCheckButton({playerObj}) {
    const {displayRoleCheckOverlay} = useNightContext();

    function handleClick() {
        // add logic here to check if consi check is available
        const consiPlayer = MafiaGame.findPlayerByRole("Consigliere");
        if (consiPlayer.isAlive) {
            if (!MafiaGame.consiHasChecked) {
                displayRoleCheckOverlay("Consigliere", playerObj);
            }
            else {
                toast.error("The Consigliere has already used their 1 check this game!")
            }
        }
        else {
            toast.error("The Consigliere is dead, no actions can be performed.")
        }
    }


    return (
        <button className="consi-check-button" onClick={handleClick}>Consi Check</button>
    )
}

export default ConsiCheckButton