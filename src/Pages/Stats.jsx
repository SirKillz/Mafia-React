import "../css/stats.css"

import { useEffect, useState } from "react"
import { Link } from "react-router";

import BACKENDAPI from "../GameAPI/backendAPI";

function Stats() {
    const [allPlayers, setAllPlayers] = useState([]);
    const [gameStats, setGameStats] = useState({});

    // Load existing players on mount
    useEffect(() => {
    BACKENDAPI.getPlayers()
        .then(setAllPlayers)
        .catch((err) => console.error("Could not fetch players:", err));
    }, []);

    // Load game stats on mount
    useEffect(() => {
        BACKENDAPI.getGameStats()
        .then(setGameStats)
        .catch((err) => console.error("Could not fetch game stats:", err));
    }, []);


    return (
        <div className="stats">
            <h1 className="page-title">Mafia Stats</h1>
            <Link className="button-default" to="/">Back</Link>
            <div className="container">
                <div className="game-stats">
                    <table>
                        <thead>
                            <tr>
                                <th>Mafia Win Rate:</th>
                                <th>Innocent Win Rate:</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{gameStats.mafia_win_rate * 100}%</td>
                                <td>{gameStats.innocent_win_rate * 100}%</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
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
            
        </div>
    )
}

export default Stats