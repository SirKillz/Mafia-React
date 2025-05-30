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
import UnderCoverCopActionFrame from "./night/nightFrames/UndercoverCopActionFrame";
import SpyActionFrame from "./night/nightFrames/SpyActionFrame";
import MedicActionFrame from "./night/nightFrames/MedicActionFrame";
import AssassinActionFrame from "./night/nightFrames/AssassinActionFrame";

import PreviousNightActions from "./PreviousNightActions";

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
        assassinHasShot,
        spyCheckedPlayer,
        updatePreviousNightActionsClass
        
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

            case "Undercover Cop":
                return <UnderCoverCopActionFrame />

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
            assassinHasShot,
            spyCheckedPlayer
        );
        updateView("results");
    }

    return (
        <>
            <PreviousNightActions />
            <RoleCheck/>
            <div className="night">
                <h1 className="page-title light">Night</h1>
                <button 
                    className="button-default"
                    onClick={() => updatePreviousNightActionsClass("pop-up")}
                >
                    Show Previous Night Actions
                </button>
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