import "../css/continue.css"

import { useNav } from "../contexts/NavContext"

import { loadGame } from "../operation";
import MafiaGame from "../GameAPI/mafiaGame";

function ContinueGame() {
    const {updateView} = useNav();

    function handleClick(action) {
        if (action === "yes") {
            console.log("yes clicked");
            const didLoad = loadGame(MafiaGame);
            if (didLoad) {
                console.log("Game did load");
                if (MafiaGame.gamePhase === "day") {
                    updateView("daytime");
                    return
                }
                else if (MafiaGame.gamePhase === "night") {
                    updateView("nightTime");
                    return
                }
            }
        }
        else {
            localStorage.clear();
            updateView("welcome");
        }
    }

    return (
        <div className="continue">
            <h1>In Progress Game Detected!</h1>
            <h2>Would you like to continue the in progress game?</h2>
            <div className="continue-buttons">
                <button className="yes-button" onClick={() => handleClick("yes")}>Yes</button>
                <button className="no-button" onClick={() => handleClick("no")}>No</button>
            </div>
        </div>
    )
}

export default ContinueGame;