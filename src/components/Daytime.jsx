import "../css/day/daytime.css"

import MafiaGame from "../GameAPI/mafiaGame"
import DayTable from "./day/DayTable"
import DayPhaseButton from "./day/DayPhaseButton"
import AttorneyActionFrame from "./day/AttorneyActionFrame"
import ModActions from "./day/ModActions"

import { useDayContext } from "../contexts/DayContext"

function Daytime() {
    const {votedPlayers, setModActionsClass} = useDayContext();
    return (
        <>
            <ModActions />
            <div className="daytime">
                <h1 className="page-title">Daytime</h1>
                <h2>Votes Needed to Kill: {MafiaGame.getVoteMajority()}</h2>
                <button 
                    className="button-default"
                    onClick={() => setModActionsClass("pop-up")}
                >Mod Tools
                </button>
                <div className="table-div">
                    {votedPlayers.length > 0 && MafiaGame.roleIsPresent("Attorney") ? <AttorneyActionFrame /> : <></>}
                    <DayTable />
                </div>
                <DayPhaseButton text="Go to Sleep" className="night-button"/>
            </div>
        
        </>
        

    )
}

export default Daytime