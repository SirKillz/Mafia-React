import "../css/night/night.css"

import NightTable from "./night/NightTable";
import NightNavButtons from "./night/NightNavButtons";
import { useNightContext } from "../contexts/NightContext";
import MafiaGame from "../GameAPI/mafiaGame";
import { useNav } from "../contexts/NavContext";

import ConsiActionFrame from "./night/nightFrames/ConsiActionFrame";
import MafiaActionFrame from "./night/nightFrames/MafiaActionFrame";
import RoleCheck from "./common/RoleCheck";
import EnforcerActionFrame from "./night/nightFrames/EnforcerActionFrame";
import BossActionFrame from "./night/nightFrames/BossActionFrame";
import SpyActionFrame from "./night/nightFrames/SpyActionFrame";
import MedicActionFrame from "./night/nightFrames/MedicActionFrame";
import AssassinActionFrame from "./night/nightFrames/AssassinActionFrame";

function Night() {
    const {updateView} = useNav();

    const {
        nightFrame, 
        actionFrameClass,
        killedPlayers,
        silencedPlayers,
        enforcedPlayers,
        savedPlayers,
        assassinatedPlayers,
        consiHasChecked,
        assassinHasShot
        
    } = useNightContext();

    function renderNightFrame() {
        switch(nightFrame) {
            case "Consigliere":
                return <ConsiActionFrame />

            case "Mafia":
                return <MafiaActionFrame />
            
            case "Enforcer":
                return <EnforcerActionFrame />

            case "Mafia Boss":
                return <BossActionFrame />

            case "Spy":
                return <SpyActionFrame />
            
            case "Medic":
                return <MedicActionFrame />
            
            case "Assassin":
                return <AssassinActionFrame />
        }
    }

    function prepareNightResults() {
        MafiaGame.performNightRoutine(
            killedPlayers, 
            assassinatedPlayers, 
            savedPlayers, 
            enforcedPlayers, 
            silencedPlayers,
            consiHasChecked,
            assassinHasShot
        );
        updateView("results");
    }

    return (
        <>
            <RoleCheck/>
            <div className="night">
                <h1 className="page-title">Night</h1>
                <NightNavButtons />
                <div className="night-main">
                    <div className={actionFrameClass}>
                        {renderNightFrame()}
                    </div>
                    <NightTable />
                </div>
                <button className="continue-button" onClick={prepareNightResults}>CONTINUE</button>
            </div>
        </>
    )
}

export default Night;