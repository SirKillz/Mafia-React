import "../css/welcome.css"

import NavButton from "./common/NavButton";
import MafiaGame from "../GameAPI/mafiaGame";
import { useNav } from "../contexts/NavContext";

function WelcomePage() {
    const {updateView} = useNav();

    function handleDebug() {
        MafiaGame.swapDebugArray();
        updateView("daytime");
        console.log(MafiaGame);
    }

    return (
        <div className="welcome">
            <button onClick={handleDebug}>Debug</button>
            <NavButton text={"ENJOY"} className="enjoy-button" nextPage={"playerEntry"}/>
        </div>
    )
}

export default WelcomePage;