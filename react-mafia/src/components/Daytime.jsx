import "../css/day/daytime.css"

import MafiaGame from "../GameAPI/mafiaGame"
import DayTable from "./day/DayTable"
import DayPhaseButton from "./day/DayPhaseButton"

function Daytime() {
    return (
        <div className="daytime">
            <h1 className="page-title">Daytime</h1>
            <h2>Votes Needed to Kill: {MafiaGame.getVoteMajority()}</h2>
            <div className="table-div">
                <DayTable />
            </div>
            <DayPhaseButton text="Go to Sleep" className="night-button"/>
        </div>

    )
}

export default Daytime