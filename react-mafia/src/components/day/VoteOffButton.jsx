import "../../css/day/voteOffButton.css"

import { useState } from "react"
import { toast } from "react-toastify";

import { useDayContext } from "../../contexts/DayContext";

function VoteOffButton({playerObj}) {
    const { votedPlayers, addVotedPlayer, removeVotedPlayer } = useDayContext();
    const [buttonState, setButtonState] = useState(0);
    const [buttonText, setButtonText] = useState("Vote Off?");

    function handleClick() {
        if (buttonState === 0) {

            if (votedPlayers.length === 0) {
                setButtonState(1);
                setButtonText("Undo?");
                addVotedPlayer(playerObj);
            }
            else {
                toast.warn(`You can only have one voted off player at a time.  Please remove ${votedPlayers[0].name} before attempting to add ${playerObj.name}`);
            }
        }
        else {
            setButtonState(0);
            setButtonText("Vote Off?");
            removeVotedPlayer(playerObj);
        }
    }

    return (
        <button 
            className={buttonState === 0 ? "vote-off" : "undo"}
            onClick={handleClick}
        >
            {buttonText}
        </button>
    )
}

export default VoteOffButton