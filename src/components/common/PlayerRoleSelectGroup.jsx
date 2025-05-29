import "../../css/formControls.css"

import { useState } from "react";

import roles from "../../GameAPI/roles"
import MafiaGame from "../../GameAPI/mafiaGame"

function PlayerRoleSelectGroup({playerObj}) {
    const [selectorClassRole, setSelectorClassRole] = useState(`role-selector role innocent`);

    function formatRoleClassName(role) {
        let formattedRole = role.toLowerCase().replace(" ", "-");
        return `role ${formattedRole}`;
    }

    function handleRoleChange(playerId, newRole) {
        const player = MafiaGame.findPlayerByID(playerId);
        player.updateRole(newRole);
        const formattedRole = formatRoleClassName(newRole);
        setSelectorClassRole(`role-selector ${formattedRole}`);
    }


    return (
        <div className="player-row">
            <p>{playerObj.name}</p>
            <select className={selectorClassRole} onChange={e => handleRoleChange(playerObj.id, e.target.value)}>
                {roles.allRoles.map(role => {
                    return <option className={formatRoleClassName(role)} key={role} value={role}>{role}</option>
                })}
            </select>
        </div>
    )
}

export default PlayerRoleSelectGroup