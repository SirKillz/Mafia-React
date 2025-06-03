import { createContext, useContext, useState, } from "react";

import MafiaGame from "../GameAPI/mafiaGame";

const DayContext = createContext({
    votedPlayers: null,
    addVotedPlayer: () => {},
    removeVotedPlayer: () => {},
    attorneyDefenseUsed: null,
    updateAttoryneyDefenseUsed: () => {},
    modActionsClass: null,
    setModActionsClass: () => {}
})

export function DayProvider({children}) {
    const [votedPlayers, setVotedPlayers] = useState([]);
    const [attorneyDefenseUsed, setAttorneyDefenseUsed] = useState(MafiaGame.attorneyHasDefended); // defaults to false
    const [modActionsClass, setModActionsClass] = useState("hidden");

    function addVotedPlayer(playerObj) {
        setVotedPlayers(
            [
                ...votedPlayers,
                playerObj
            ]
        )
    }

    function removeVotedPlayer(playerObj) {
        setVotedPlayers(votedPlayers.filter(player => player.id !== playerObj.id))
    }

    function updateAttoryneyDefenseUsed(boolVal) {
        if (boolVal) {
            setAttorneyDefenseUsed(true);
        }
        else {
            setAttorneyDefenseUsed(false);
        }
    }




    return (
        <DayContext.Provider value={
            { 
                votedPlayers, 
                addVotedPlayer, 
                removeVotedPlayer, 
                attorneyDefenseUsed, 
                updateAttoryneyDefenseUsed,
                modActionsClass, 
                setModActionsClass
            }
        }>
            {children}
        </DayContext.Provider >
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDayContext() {
    return useContext(DayContext)
}