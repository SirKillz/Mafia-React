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
    updateActiveKillPower: () => {},
    roleCheckOverlayClass: null,
    roleCheckResultClass: null,
    roleCheckResultText: null,
    displayRoleCheckOverlay: () => {},
    resetRoleCheckOverlay: () => {},
    enforcedPlayers: null,
    updateEnforcedPlayers: () => {},
    removeEnforcedPlayer: () => {},
    savedPlayers: null,
    updateSavedPlayers: () => {},
    removeSavedPlayer: () => {},
    assassinatedPlayers: null,
    updateAssassinatedPlayers: () => {},
    removeAsssassinatedPlayer: () => {},
    updateAssassinHasShot: () => {},
    silencedPlayers: null,
    updateSilencedPlayers: () => {},
    removeSilencedPlayer: () => {},
    consiHasChecked: null,
    assassinHasShot: null,
    spyCheckedPlayer: null,
    updateSpyCheckedPlayer: () => {}
})

export function NightProvider({children}) {
    // GENERAL NIGHT: 
    const [actingRole, setActingRole] = useState("");
    const [nightFrame, setNightFrame] = useState("");
    const [actionFrameClass, setActionFrameClass] = useState("hidden");

    // Consi and Spy Role Context:
    const [roleCheckOverlayClass, setRoleCheckOverlayClass] = useState("hidden");
    const [roleCheckResultClass, setRoleCheckResultClass] = useState("hidden");
    const [roleCheckResultText, setRoleCheckResultText] = useState("");
    
    // Consi Specific Context:
    const [consiHasChecked, setConsiHasChecked] = useState(MafiaGame.consiHasChecked); //updated in displayRoleOverlay

    // Mafia Role Context
    const [killedPlayers, setKilledPlayers] = useState([]);
    const [activeKillPower, setActiveKillPower] = useState(MafiaGame.mafiaKillPower);

    // Enforcer Role Context
    const [enforcedPlayers, setEnforcedPlayers] = useState([]);

    // Mafia Boss Role Context
    const [silencedPlayers, setSilencedPlayers] = useState([]);

    // Spy Role Context 
    const [spyCheckedPlayer, setSpyCheckedPlayer] = useState(null);

    // Medic Role context
    const [savedPlayers, setSavedPlayers] = useState([]);

    // Assassin Role Context
    const [assassinatedPlayers, setAssassinatedPlayers] = useState([]);
    const [assassinHasShot, setAssassinHasShot] = useState(MafiaGame.assassinHasShot);

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

    // function used for displaying the result of spy and consi checks
    function displayRoleCheckOverlay(actingRole, playerObj) {
        setRoleCheckOverlayClass("role-check-show");

        if (actingRole === "Consigliere") {
            setConsiHasChecked(true);
            switch(playerObj.isSpecialInnocent) {
                case true:
                    setRoleCheckResultClass("consi-special-innocent");
                    setRoleCheckResultText("SPECIAL INNOCENT");
                    break
                case false:
                    setRoleCheckResultClass("consi-regular-innocent");
                    setRoleCheckResultText("REGULAR INNOCENT");
                    break
            }
        }
        else if (actingRole === "Spy") {
            switch(playerObj.isMafia) {
                case true:
                    setRoleCheckResultClass("spy-mafia");
                    setRoleCheckResultText("MAFIA");
                    break
                case false:
                    setRoleCheckResultClass("spy-innocent");
                    setRoleCheckResultText("INNOCENT");
                    break
            }
        }
    }

    function resetRoleCheckOverlay() {
        setRoleCheckOverlayClass("hidden");
        setRoleCheckResultClass("hidden");
        setRoleCheckResultText("");
    }

    function updateEnforcedPlayers(playerObj) {
        setEnforcedPlayers(prevEnforcedPlayers => 
            [
                ...prevEnforcedPlayers,
                playerObj
            ]
        )

    }

    function removeEnforcedPlayer(playerObj) {
        setEnforcedPlayers(enforcedPlayers.filter(player => player.id !== playerObj.id));
    }

    function updateSavedPlayers(playerObj) {
        setSavedPlayers(prevSavedPlayers => [
            ...prevSavedPlayers,
            playerObj
        ])
    }

    function removeSavedPlayer(playerObj) {
        setSavedPlayers(savedPlayers.filter(player => player.id !== playerObj.id));
    }

    function updateAssassinatedPlayers(playerObj) {
        setAssassinatedPlayers(prevAssassinatedPlayers => [
            ...prevAssassinatedPlayers,
            playerObj
        ])
    }

    function removeAsssassinatedPlayer(playerObj) {
        setAssassinatedPlayers(assassinatedPlayers.filter(player => player.id !== playerObj.id))
    }

    function updateAssassinHasShot(boolValue) {
        if (boolValue) setAssassinHasShot(true);
        else setAssassinHasShot(false);
    }

    function updateSilencedPlayers(playerObj) {
        setSilencedPlayers(prevSilencedPlayers => [
            ...prevSilencedPlayers,
            playerObj
        ])
    }

    function removeSilencedPlayer(playerObj) {
        setSilencedPlayers(silencedPlayers.filter(player => player.id !== playerObj.id));
    }

    function updateSpyCheckedPlayer(playerObj) {
        setSpyCheckedPlayer(playerObj);
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
                updateActiveKillPower,
                roleCheckOverlayClass,
                roleCheckResultClass,
                roleCheckResultText,
                displayRoleCheckOverlay,
                resetRoleCheckOverlay,
                enforcedPlayers,
                updateEnforcedPlayers,
                removeEnforcedPlayer,
                savedPlayers,
                updateSavedPlayers,
                removeSavedPlayer,
                updateAssassinHasShot,
                assassinatedPlayers,
                updateAssassinatedPlayers,
                removeAsssassinatedPlayer,
                silencedPlayers,
                updateSilencedPlayers,
                removeSilencedPlayer,
                consiHasChecked,
                assassinHasShot,
                spyCheckedPlayer,
                updateSpyCheckedPlayer
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