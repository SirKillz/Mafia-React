import { createContext, useContext, useState, } from "react";

import MafiaGame from "../GameAPI/mafiaGame";

const NightContext = createContext({
    actingRole: null,
    updateActingRole: () => {},
    nightFrame: () => {},
    killedPlayers: null,
    updateKilledPlayers: () => {},
    removeKilledPlayer: () => {},
    activeKillPower: null,
    updateActiveKillPower: () => {}
})

export function NightProvider({children}) {
    const [actingRole, setActingRole] = useState("");
    const [killedPlayers, setKilledPlayers] = useState([]);
    const [nightFrame, setNightFrame] = useState("");
    const [activeKillPower, setActiveKillPower] = useState(MafiaGame.mafiaKillPower);

    function updateActingRole(roleName) {
        setActingRole(roleName);
        setNightFrame(roleName)
    }

    function updateKilledPlayers(playerObj) {
        setKilledPlayers(prevKilledPlayers => [
            ...prevKilledPlayers,
            playerObj
        ])
    }

    function removeKilledPlayer(playerObj) {
        setKilledPlayers(killedPlayers.filter(player => player.id !== playerObj.id))
    }

    function updateActiveKillPower(direction) {
        if (direction === "increase") {
            setActiveKillPower(previousKillPower => previousKillPower + 1);
        }
        else if (direction === "decrease") {
            setActiveKillPower(previousKillPower => previousKillPower - 1);
        }
    }

    return (
        <NightContext.Provider value={
            { 
                actingRole, 
                updateActingRole, 
                nightFrame, 
                killedPlayers, 
                updateKilledPlayers, 
                removeKilledPlayer,
                activeKillPower,
                updateActiveKillPower 

            }
        }>
            {children}
        </NightContext.Provider >
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNightContext() {
    return useContext(NightContext)
}