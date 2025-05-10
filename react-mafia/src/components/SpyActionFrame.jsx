import "../css/night/spyActionFrame.css"


import MafiaGame from "../GameAPI/mafiaGame"

function SpyActionFrame() {

    function getSpyInstructionText() {
        const spyPlayer = MafiaGame.findPlayerByRole("Spy");
        if (spyPlayer.isAlive) {
            if (spyPlayer.canPerformAction) {
                return "Select the player in which the Spy wishes to check.";
            }
            else {
                return "The Spy has been blocked by the Enforcer and thus cannot check!"
            }
        }
        else {
            return "The Spy is DEAD, thus no actions can be performed."
        }
    }

    return (
        <div className="spy-action-frame">
            <h2>Spy Actions:</h2>
            <p>{getSpyInstructionText()}</p>
        </div>
    )
}

export default SpyActionFrame