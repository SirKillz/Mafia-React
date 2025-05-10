import "../css/mafiaActionFrame.css"

import { useNightContext } from "../contexts/NightContext"

function MafiaActionFrame() {
    const {killedPlayers, removeKilledPlayer, activeKillPower, updateActiveKillPower} = useNightContext();

    function handleClick(playerObj) {
        removeKilledPlayer(playerObj);
        updateActiveKillPower("increase");
    }

    return (
        <div className="mafia-action-frame">
            <h2>Mafia Actions:</h2>
            <h2>Kill Power Remaining: {activeKillPower}</h2>
            <h3>Players to be killed:</h3>
            {killedPlayers.map(player => {
                return (
                    <div className="killed-player-row" key={player.id}>
                        <p>{player.name}</p>
                        <button onClick={() => handleClick(player)}>Remove Kill</button>
                    </div>
                )
            })}
        </div>
    )
}

export default MafiaActionFrame