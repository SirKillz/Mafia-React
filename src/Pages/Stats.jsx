import "../css/stats.css"

import { useEffect, useState } from "react"
import { Link } from "react-router";

import BACKENDAPI from "../GameAPI/backendAPI";

function Stats() {
    const [allPlayers, setAllPlayers] = useState([]);

    // Load existing players on mount
    useEffect(() => {
    BACKENDAPI.getPlayers()
        .then(setAllPlayers)
        .catch((err) => console.error("Could not fetch players:", err));
    }, []);


    return (
        <div className="stats">
            <h1 className="page-title">Mafia Stats</h1>
            <Link className="button-default" to="/">Back</Link>
            <div className="player-table">
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                        </tr>
                    </thead>
                    <tbody>
                        {allPlayers.map(player => {
                            return (
                                <tr key={player.player_id}>
                                    <td><Link to={`/stats/player/${player.player_id}`}>{player.name}</Link></td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default Stats