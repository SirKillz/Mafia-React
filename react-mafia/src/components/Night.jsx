import "../css/night/night.css"

import NightTable from "./common/NightTable";
import NightNavButtons from "./common/NightNavButtons";
import { useNightContext } from "../contexts/NightContext";

import ConsiActionFrame from "./ConsiActionFrame";
import MafiaActionFrame from "./MafiaActionFrame";
import SpyActionFrame from "./SpyActionFrame";
import RoleCheck from "./common/RoleCheck";
import EnforcerActionFrame from "./EnforcerActionFrame";

function Night() {
    const {nightFrame, actionFrameClass} = useNightContext();

    function renderNightFrame() {
        switch(nightFrame) {
            case "Consigliere":
                return <ConsiActionFrame />

            case "Mafia":
                return <MafiaActionFrame />
            
            case "Enforcer":
                return <EnforcerActionFrame />

            case "Spy":
                return <SpyActionFrame />
        }
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
            </div>
        </>
    )
}

export default Night;