import "../../../css/night/assassinKillButton.css"

import { toast } from 'react-toastify'

import MafiaGame from "../../../GameAPI/mafiaGame"
import { useNightContext } from "../../../contexts/NightContext";

function AssassinKillButton({playerObj}) {
    const {assassinatedPlayers, updateAssassinatedPlayers, updateAssassinHasShot} = useNightContext();

    function handleClick() {
        const assassinPlayer = MafiaGame.findPlayerByRole("Assassin");
        if (assassinPlayer.isAlive) {
            if (!MafiaGame.assassinHasShot && assassinatedPlayers.length === 0) {
                if (assassinPlayer.canPerformAction) {
                    updateAssassinatedPlayers(playerObj);
                    updateAssassinHasShot(true);
                }
                else {
                    toast.error("The Assassin has been enforced and thus no actions can be performed");
                }
            }
            else {
                toast.error("The Assassin has already used their 1 shot this game!")
            }
        }
        else {
            toast.error("The Assassin is dead, no actions can be performed.")
        }
    }


    return (
        <button className="assassin-kill-button" onClick={handleClick}>Assassinate</button>
    )
}

export default AssassinKillButton