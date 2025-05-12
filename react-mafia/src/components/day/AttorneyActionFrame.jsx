import "../../css/day/attorneyActionFrame.css"

import { useState } from "react";

import MafiaGame from "../../GameAPI/mafiaGame"
import { useDayContext } from "../../contexts/DayContext";

function AttorneyActionFrame() {
    const {attorneyDefenseUsed, updateAttoryneyDefenseUsed} = useDayContext();
    const [attorneyDefenseCount, setAttorneyDefenseCount] = useState(
        attorneyDefenseUsed ? 0 : 1
    );
    const [buttonText, setButtonText] = useState("Defend");

    function handleDefense() {
        if (!attorneyDefenseUsed) {
            updateAttoryneyDefenseUsed(true);
            setAttorneyDefenseCount(0);
            setButtonText("Undo Defense");
        }
        else {
            updateAttoryneyDefenseUsed(false);
            setAttorneyDefenseCount(1);
            setButtonText("Defend");
        }
    }

    function getAttoryneyInstructionText() {
        if (!attorneyDefenseUsed) {
            return "The Attorney can decide to defend the nominated player."
        }
        else {
            return "The Attorney has already used their one defense this game."
        }
    }

    return (
        <div className="attorney-action-frame">
            <h2>Attorney Actions:</h2>
            <h3>Attorney Defenses Remaining: {attorneyDefenseCount}</h3>
            <p>{getAttoryneyInstructionText()}</p>
            {attorneyDefenseUsed ? <></> : <p>Only click after Attorney has used defenese!</p>}
            {attorneyDefenseUsed ? <></> : <button className="defend-button"onClick={handleDefense}>{buttonText}</button>}
        </div>
    )
}

export default AttorneyActionFrame