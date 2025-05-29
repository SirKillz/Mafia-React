import "../../../css/night/actionFrames/assassinActionFrame.css"

import { useNightContext } from "../../../contexts/NightContext"
import MafiaGame from "../../../GameAPI/mafiaGame";

function AssassinActionFrame() {
    const {assassinatedPlayers, removeAsssassinatedPlayer, updateAssassinHasShot} = useNightContext();

    function handleClick(playerObj) {
        removeAsssassinatedPlayer(playerObj);
        updateAssassinHasShot(false);
    }

    function getAssassinInstructionText() {
            const assassinPlayer = MafiaGame.findPlayerByRole("Assassin");
            if (assassinPlayer.isAlive) {
                if (!MafiaGame.assassinHasShot) {
                    if (assassinPlayer.canPerformAction) {
                        return "Select the player in which the Assassin wishes to assassinate.";
                    }
                    else {
                        return "The Assassin has been blocked by the Enforcer and thus no actions can be performed!"
                    }
                }
                else {
                    return "The Assassin has utilized their 1 shot this game and cannot shoot again!"
                }
            }
            else {
                return "The Assassin is DEAD, thus no actions can be performed."
            }
        }

    return (
        <div className="assassin-action-frame">
            <h2>Assassin Actions:</h2>
            <p>{getAssassinInstructionText()}</p>
            <h3>Player to be assassinated:</h3>
            {assassinatedPlayers.map(player => {
                return (
                    <div className="assassinated-player-row" key={player.id}>
                        <p>{player.name}</p>
                        <button className="remove-assassination-button button-default" onClick={() => handleClick(player)}>Remove Kill</button>
                    </div>
                )
            })}
        </div>
    )
}

export default AssassinActionFrame