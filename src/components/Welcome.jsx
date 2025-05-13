import "../css/welcome.css"
import mafiaImage from "../assets/mafia.png"

import NavButton from "./common/NavButton";
import MafiaGame from "../GameAPI/mafiaGame";
import { useNav } from "../contexts/NavContext";

function WelcomePage() {
    const {updateView} = useNav();

    const ENV = import.meta.env.VITE_ENV;

    function handleDebug() {
        MafiaGame.swapDebugArray();
        updateView("daytime");
    }

    return (
        <>
            <div className="welcome">
                <div className="header">
                    <img src={mafiaImage} alt="" />
                </div>
                <div className="button-div">
                    {ENV === "dev" && <button onClick={handleDebug}>Debug</button>}
                    <NavButton text={"ENJOY"} className="enjoy-button" nextPage={"playerEntry"}/>
                </div>
            </div>
        </>
    )
}

export default WelcomePage;