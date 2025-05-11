import "../../../css/night/actionFrames/copActionFrame.css"


import MafiaGame from "../../../GameAPI/mafiaGame"

function UnderCoverCopActionFrame() {

    return (
        <div className="cop-action-frame">
            <h2>Cop Actions:</h2>
            <p>On the count of 3, ask the Mafia Boss & Spy to silently raise their hands</p>
            <p>The Cop will get to see the Boss & Spy but not know who is who</p>
        </div>
    )
}

export default UnderCoverCopActionFrame