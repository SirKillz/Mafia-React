import "../css/player-stats.css"

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router";

import BACKENDAPI from "../GameAPI/backendAPI";

function PlayerStats() {
  const [playerStats, setPlayerStats] = useState({});
  const [averageStats, setAverageStats] = useState({});
  const [error, setError] = useState(null);
  const { playerId } = useParams();

  // Helper: format rate as percent or blank if null
  const formatPercent = (value) =>
    value !== null && value !== undefined ? `${value * 100}%` : "";

  // Load player stats on mount
  useEffect(() => {
    if (!playerId) return;
    BACKENDAPI.getPlayerStats(playerId)
      .then((stats) => setPlayerStats(stats))
      .catch((err) => {
        console.error("Could not fetch player stats:", err);
        setError("Failed to load stats");
      });
  }, [playerId]);

  // Load average stats on mount
  useEffect(() => {
    BACKENDAPI.getAveragePlayerStats()
      .then(setAverageStats)
      .catch((err) => console.error("Could not fetch average game stats:", err));
  }, []);

  if (error) {
    return (
      <div className="player-stats">
        <h1>No stats available for player</h1>
        <Link className="button-default" to="/stats">
          Back
        </Link>
      </div>
    );
  }

  return (
    <div className="player-stats">
      <h1>{playerStats.player_name}</h1>

      <div className="ind-player-stats">
        <h3>Individual Player Stats</h3>
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
                <td>{formatPercent(playerStats.mafia_win_rate)}</td>
                <td>{formatPercent(playerStats.innocent_win_rate)}</td>
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
                <td>{playerStats.games_played || ""}</td>
                <td>{playerStats.mafia_games || ""}</td>
                <td>{playerStats.innocent_games || ""}</td>
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
                <td>{formatPercent(playerStats.spy_check_rate)}</td>
                <td>{formatPercent(playerStats.medic_self_save_rate)}</td>
                <td>{formatPercent(playerStats.successful_medic_save_rate)}</td>
                <td>{formatPercent(playerStats.successful_assassin_shot_rate)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      <div className="average-stats">
        <h3>Average Game Stats</h3>
        <table>
          <thead>
            <tr>
              <th>AVG Spy Check Rate:</th>
              <th>AVG Medic Self Save Rate:</th>
              <th>AVG Medic Save Rate:</th>
              <th>AVG Assassin Kill Rate:</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{formatPercent(averageStats.avg_spy_check_rate)}</td>
              <td>{formatPercent(averageStats.avg_medic_self_save_rate)}</td>
              <td>{formatPercent(averageStats.avg_successful_medic_save_rate)}</td>
              <td>{formatPercent(
                averageStats.avg_successful_assassin_shot_rate
              )}</td>
            </tr>
          </tbody>
        </table>
      </div>

      <Link className="button-default" to="/stats">
        Back to Players
      </Link>
    </div>
  );
}

export default PlayerStats;
