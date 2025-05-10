import { createContext, useContext, useState, } from "react";

const DayContext = createContext({
    votedPlayers: null,
    addVotedPlayer: () => {},
    removeVotedPlayer: () => {}
})

export function DayProvider({children}) {
    const [votedPlayers, setVotedPlayers] = useState([]);

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


    return (
        <DayContext.Provider value={{ votedPlayers, addVotedPlayer, removeVotedPlayer }}>
            {children}
        </DayContext.Provider >
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useDayContext() {
    return useContext(DayContext)
}