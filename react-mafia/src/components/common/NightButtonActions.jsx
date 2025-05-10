import MafiaGame from "../../GameAPI/mafiaGame"

import { useNightContext } from "../../contexts/NightContext"

function NightButtonActions()  {
    const {updateActingRole} = useNightContext()

    return (
        <div className="night-buttons">
            {MafiaGame.roleIsPresent("Consigliere") ? <button onClick={() => updateActingRole("Consigliere")}>Consigliere</button>: <></>}
            {MafiaGame.roleIsPresent("Mafia") ? <button onClick={() => updateActingRole("Mafia")}>Mafia</button>: <></>}
            {MafiaGame.roleIsPresent("Mafia Boss") ? <button onClick={() => updateActingRole("Mafia Boss")}>Mafia Boss</button>: <></>}
            {MafiaGame.roleIsPresent("Enforcer") ? <button onClick={() => updateActingRole("Enforcer")}>Enforcer</button>: <></>}
            {MafiaGame.roleIsPresent("Spy") ? <button onClick={() => updateActingRole("Spy")}>Spy</button>: <></>}
            {MafiaGame.roleIsPresent("Medic") ? <button onClick={() => updateActingRole("Medic")}>Medic</button>: <></>}
            {MafiaGame.roleIsPresent("Assassin") ? <button onClick={() => updateActingRole("Assassin")}>Assassin</button>: <></>}
        </div>
    )
}

export default NightButtonActions