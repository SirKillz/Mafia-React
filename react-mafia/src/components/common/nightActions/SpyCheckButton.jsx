import "../../../css/night/spyCheckButton.css"

import { toast } from 'react-toastify'

import MafiaGame from "../../../GameAPI/mafiaGame"
import { useNightContext } from "../../../contexts/NightContext";

function SpyCheckButton({playerObj}) {
    const {displayRoleCheckOverlay} = useNightContext();

    function handleClick() {
        // add logic here to check if spy check is available
        const spyPlayer = MafiaGame.findPlayerByRole("Spy");
        if (spyPlayer.isAlive && spyPlayer.canPerformAction) {
            displayRoleCheckOverlay("Spy", playerObj);
        }
        else {
            toast.error("The Spy is either dead or has been blocked by the enforcer!")
        }
    }


    return (
        <button className="spy-check-button" onClick={handleClick}>Spy Check</button>
    )
}

export default SpyCheckButton