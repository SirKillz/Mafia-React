import "../css/night.css"

import NightTable from "./common/NightTable";
import NightButtonActions from "./common/NightButtonActions";
import { useNightContext } from "../contexts/NightContext";

import MafiaActionFrame from "./MafiaActionFrame";

function Night() {
    const {nightFrame} = useNightContext();

    function renderNightFrame() {
        switch(nightFrame) {
            case "Mafia":
                return <MafiaActionFrame />
        }
    }

    return (
        <div className="night">
            <h1 className="page-title">Night</h1>
            <NightButtonActions />
            <div className="night-main">
                <NightTable />
                <div className="night-frame">
                    {renderNightFrame()}
                </div>
            </div>
        </div>
    )
}

export default Night;