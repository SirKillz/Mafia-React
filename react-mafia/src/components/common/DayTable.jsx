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
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default DayTable