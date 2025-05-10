import { createContext, useContext, useState, } from "react";

import MafiaGame from "../GameAPI/mafiaGame";

const NightContext = createContext({
    actingRole: null,
    nightFrame: null,
    actionFrameClass: null,
    updateActingRole: () => {},
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
    const [actionFrameClass, setActionFrameClass] = useState("hidden");
    const [activeKillPower, setActiveKillPower] = useState(MafiaGame.mafiaKillPower);

    function updateActingRole(roleName) {
        setActingRole(roleName);
        setNightFrame(roleName);
        setActionFrameClass("action-frame");
    }

    function updateKilledPlayers(playerObj) {
        setKilledPlayers(prevKilledPlayers => [
            ...prevKilledPlayers,
            playerObj
        ])
    }

    function removeKilledPlayer(playerObj) {
        setKilledPlayers(prevKilledPlayers => {

            // looks at the current killedPlayers array and attempts to find the first index where the player id matches
            const index = prevKilledPlayers.findIndex(player => player.id === playerObj.id);
            
            // if no index is found, simply return the existing array, this should never happen
            // findIndex returns -1 when no index is found matching the callback
            if (index < 0) return prevKilledPlayers;

            // if an index is found, create a new array spreading the old array in
            // splice out starting from the found index position
            // return the new array
            const newKilledPlayers = [...prevKilledPlayers];
            newKilledPlayers.splice(index, 1);
            return newKilledPlayers;
        })
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
                nightFrame, 
                actionFrameClass,
                updateActingRole, 
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