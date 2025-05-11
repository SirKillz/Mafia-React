import roles from "../../GameAPI/roles"
import MafiaGame from "../../GameAPI/mafiaGame"

function PlayerRoleSelectGroup({playerObj}) {
    function handleRoleChange(playerId, newRole) {
        const player = MafiaGame.findPlayerByID(playerId);
        player.updateRole(newRole);
    }


    return (
        <div className="player-row">
            <p>{playerObj.name}</p>
            <select className="role-selector" onChange={e => handleRoleChange(playerObj.id, e.target.value)}>
                {roles.allRoles.map(role => {
                    return <option key={role} value={role}>{role}</option>
                })}
            </select>
        </div>
    )
}

export default PlayerRoleSelectGroup