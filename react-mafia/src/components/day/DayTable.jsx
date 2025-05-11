import "../../css/table.css"

import MafiaGame from "../../GameAPI/mafiaGame"
import VoteOffButton from "./VoteOffButton"

function DayTable() {
    return (
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Player Role</th>
                    <th>Vote-Off Action</th>
                    <th>Silenced?</th>
                </tr>
            </thead>
            <tbody>
                {
                    MafiaGame.players.map(player => {
                        return (
                            <tr key={player.id}>
                                <td className={player.isAlive ? "alive": "dead"}>{player.name}</td>
                                <td className={player.isAlive ? "alive": "dead"}>{player.role}</td>
                                <td>{player.isAlive ? <VoteOffButton playerObj={player}/>: <></>}</td>
                                <td>
                                    {
                                        MafiaGame.lastNightRoutine.silencedPlayer !== null && MafiaGame.lastNightRoutine.silencedPlayer.id === player.id 
                                        ? "Silenced"
                                        : ""
                                    }
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default DayTable