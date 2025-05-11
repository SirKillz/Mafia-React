import "../css/day/daytime.css"

import MafiaGame from "../GameAPI/mafiaGame"
import DayTable from "./common/DayTable"
import DayPhaseButton from "./common/DayPhaseButton"

function Daytime() {
    console.log(MafiaGame);
    return (
        <div className="daytime">
            <h1 className="page-title">Daytime</h1>
            <div className="table-div">
                <DayTable />
            </div>
            <DayPhaseButton text="Go to Sleep" className="night-button"/>
        </div>

    )
}

export default Daytime