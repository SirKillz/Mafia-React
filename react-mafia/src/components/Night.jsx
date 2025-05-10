import "../css/night/night.css"

import NightTable from "./common/NightTable";
import NightNavButtons from "./common/NightNavButtons";
import { useNightContext } from "../contexts/NightContext";

import MafiaActionFrame from "./MafiaActionFrame";

function Night() {
    const {nightFrame, actionFrameClass} = useNightContext();

    function renderNightFrame() {
        switch(nightFrame) {
            case "Mafia":
                return <MafiaActionFrame />
        }
    }

    return (
        <div className="night">
            <h1 className="page-title">Night</h1>
            <NightNavButtons />
            <div className="night-main">
                <NightTable />
                <div className={actionFrameClass}>
                    {renderNightFrame()}
                </div>
            </div>
        </div>
    )
}

export default Night;