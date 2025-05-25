import "../css/player-stats.css"

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import BACKENDAPI from "../GameAPI/backendAPI";

function PlayerStats() {
    const [playerStats, setPlayerStats] = useState({});
    const [error, setError] = useState(null);

    const { playerId } = useParams();

    // Load player stats on mount
    useEffect(() => {
        if (!playerId) return;           // guard against missing ID

        BACKENDAPI.getPlayerStats(playerId)
        .then((stats) => {
            setPlayerStats(stats);
        })
        .catch((err) => {
            console.error("Could not fetch player stats:", err);
            setError("Failed to load stats");
        });
    }, [playerId]);

    if (error) {
        return (
            <div className="player-stats">
                <h1>No stats available for player</h1>
                <Link className="button-default" to="/stats">Back</Link>
            </div>
        )
    }

    return (
        <div className="player-stats">
            <h1>{playerStats.player_name}</h1>
            
            <div className="win-rates">
                <table>
                    <thead>
                        <tr>
                            <th>Mafia Win Rate</th>
                            <th>Innocent Win Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{playerStats.mafia_win_rate && `${playerStats.mafia_win_rate * 100}%`}</td>
                            <td>{playerStats.innocent_win_rate && `${playerStats.innocent_win_rate * 100}%`}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="game-stats">
                <table>
                    <thead>
                        <tr>
                            <th>Games Played</th>
                            <th>Mafia Games</th>
                            <th>Innocent Games</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{playerStats.games_played}</td>
                            <td>{playerStats.mafia_games}</td>
                            <td>{playerStats.innocent_games}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <div className="role-stats">
                <table>
                    <thead>
                        <tr>
                            <th>Spy Check Rate</th>
                            <th>Medic Self-Save Rate</th>
                            <th>Medic Save Rate</th>
                            <th>Assassin Shot Rate</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{playerStats.spy_check_rate && playerStats.spy_check_rate * 100 + '%'}</td>
                            <td>{playerStats.medic_self_save_rate && playerStats.medic_self_save_rate * 100 + '%'}</td>
                            <td>{playerStats.successful_medic_save_rate && playerStats.successful_medic_save_rate * 100 + '%'}</td>
                            <td>{playerStats.successful_assassin_shot_rate && playerStats.successful_assassin_shot_rate * 100 + '%'}</td>
                        </tr>
                    </tbody>
                </table>
            </div>

            <Link className="button-default" to="/stats">Back to Players</Link>
        </div>
    )
}

export default PlayerStats