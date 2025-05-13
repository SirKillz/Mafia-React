import "../css/roleEntry.css"

import MafiaGame from "../GameAPI/mafiaGame"
import PlayerRoleSelectGroup from "./common/PlayerRoleSelectGroup"
import { useNav } from "../contexts/NavContext"

function RoleEntry() {
    const {updateView} = useNav();

    function onClick() {
        MafiaGame.updateInitialMafiaCount();
        MafiaGame.calculateCounts();
        updateView("daytime");
    }

    return (
        <div className="role-entry">
            <h2 className="page-title">Player Role Selection</h2>
            <p className="instructions">Here are all the possible roles and the order players should lift their head for identification:</p>
            <div className="roles">
                <div className="role consigliere">Consigliere</div>
                <div className="role mafia-boss">Mafia Boss</div>
                <div className="role enforcer">Enforcer</div>
                <div className="role mafia">Mafia</div>
                <div className="role undercover-cop">Undercover Cop</div>
                <div className="role spy">Spy</div>
                <div className="role medic">Medic</div>
                <div className="role assassin">Assassin</div>
                <div className="role attorney">Attorney</div>
                <div className="role guild-member">Guild Member</div>
            </div>
            <h3>Night of the first day... heads down</h3>
            <div className="player-rows">
                {MafiaGame.players.map(player => {
                    return <PlayerRoleSelectGroup key={player.id} playerObj={player}/>
                })}
            </div>
            <button onClick={onClick} className="daytime-button">Daytime</button>
        </div>
    )
}

export default RoleEntry