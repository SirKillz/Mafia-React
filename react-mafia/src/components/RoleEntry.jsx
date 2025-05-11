import "../css/roleEntry.css"

import MafiaGame from "../GameAPI/mafiaGame"
import PlayerRoleSelectGroup from "./common/PlayerRoleSelectGroup"
import { useNav } from "../contexts/NavContext"

function RoleEntry() {
    const {updateView} = useNav();

    function onClick() {
        MafiaGame.updateInitialMafiaCount();
        updateView("daytime");
    }

    return (
        <div className="role-entry">
            <h2 className="page-title">Player Role Selection</h2>
            <h3>Night of the first day...</h3>
            <div className="player-rows">
                {MafiaGame.players.map(player => {
                    return <PlayerRoleSelectGroup key={player.id} playerObj={player}/>
                })}
            </div>
            <button onClick={onClick}>Daytime</button>
        </div>
    )
}

export default RoleEntry