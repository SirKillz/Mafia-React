import "../../../css/night/consiCheckButton.css"

import { toast } from 'react-toastify'

import MafiaGame from "../../../GameAPI/mafiaGame"
import { useNightContext } from "../../../contexts/NightContext";

function ConsiCheckButton({playerObj}) {
    const {displayRoleCheckOverlay} = useNightContext();

    function handleClick() {
        // add logic here to check if consi check is available
        const consiPlayer = MafiaGame.findPlayerByRole("Consigliere");
        if (consiPlayer.isAlive && consiPlayer.canPerformAction) {
            displayRoleCheckOverlay("Consigliere", playerObj);
        }
        else {
            toast.error("The Consigliere either used their 1 check or is dead.  Proceed to Mafia.")
        }
    }


    return (
        <button className="consi-check-button" onClick={handleClick}>Consi Check</button>
    )
}

export default ConsiCheckButton