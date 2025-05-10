import "../../../css/night/mafiaKillButton.css"

import { toast } from 'react-toastify'

import MafiaGame from "../../../GameAPI/mafiaGame"
import { useNightContext } from "../../../contexts/NightContext";

function ConsiCheckButton({playerObj}) {
    const {displayRoleCheckOverlay} = useNightContext();

    function handleClick() {
        // add logic here to check if consi check is available

        displayRoleCheckOverlay("Consigliere", playerObj);
    }


    return (
        <button className="consi-check-button" onClick={handleClick}>Consi Check</button>
    )
}

export default ConsiCheckButton