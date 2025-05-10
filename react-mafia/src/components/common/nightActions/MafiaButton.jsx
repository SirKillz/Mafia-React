import "../../../css/mafiaKillButton.css"

import { toast } from 'react-toastify'

import MafiaGame from "../../../GameAPI/mafiaGame"
import { useNightContext } from "../../../contexts/NightContext";

function MafiaKillButton({playerObj}) {
    const {killedPlayers, updateKilledPlayers, updateActiveKillPower} = useNightContext();


    function handleClick() {

        if (MafiaGame.mafiaKillPower > killedPlayers.length) {
            updateKilledPlayers(playerObj);
            updateActiveKillPower("decrease");
        }
        else {
            toast.error("The Mafia have already used their max kill power.  Undo a kill to proceed!");
        }    
    }


    return (
        <button className="mafia-kill-button" onClick={handleClick}>Mafia Kill</button>
    )
}

export default MafiaKillButton