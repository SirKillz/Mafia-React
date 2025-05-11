import "../../../css/night/actionFrames/consiActionFrame.css"


import MafiaGame from "../../../GameAPI/mafiaGame"

function ConsiActionFrame() {

    function getConsiInstructionText() {
        const consiPlayer = MafiaGame.findPlayerByRole("Consigliere");
        if (consiPlayer.isAlive) {
            if (!MafiaGame.consiHasChecked) {
                return "Select the player in which the Consigliere wishes to check.";
            }
            else {
                return "The Consigliere has utilized their 1 check this game and cannot check again!"
            }
        }
        else {
            return "The Consigliere is DEAD, thus no actions can be performed."
        }
    }

    return (
        <div className="consi-action-frame">
            <h2>Consi Actions:</h2>
            <p>{getConsiInstructionText()}</p>
        </div>
    )
}

export default ConsiActionFrame