import "../css/table.css"
import "../css/night/previousActions.css"

import MafiaGame from "../GameAPI/mafiaGame";

import { useNightContext } from "../contexts/NightContext";

function PreviousNightActions() {
    const {previousNightActionsClass, updatePreviousNightActionsClass} = useNightContext();
    console.log(MafiaGame.previousBossSilence, MafiaGame.previousEnforcerBlock, MafiaGame.previousMedicSave)

    return (
        <div className={previousNightActionsClass}>
            <div className="previous-actions">
                <button 
                    className="button-default"
                    onClick={() => updatePreviousNightActionsClass("hidden")}
                >
                    Close
                </button>
                <h1>Previous Night Actions:</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Role</th>
                            <th>Action</th>
                            <th>Targeted Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>Boss</td>
                            <td>Silence</td>
                            <td>
                                {
                                    MafiaGame.previousBossSilence 
                                    ? MafiaGame.findPlayerByID(MafiaGame.previousBossSilence).name
                                    : ""
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Enforcer</td>
                            <td>Block</td>
                            <td>
                                {
                                    MafiaGame.previousEnforcerBlock
                                    ? MafiaGame.findPlayerByID(MafiaGame.previousEnforcerBlock).name
                                    : ""
                                }
                            </td>
                        </tr>
                        <tr>
                            <td>Medic</td>
                            <td>Save</td>
                            <td>
                                {
                                    MafiaGame.previousMedicSave
                                    ? MafiaGame.findPlayerByID(MafiaGame.previousMedicSave).name
                                    : ""
                                }
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default PreviousNightActions