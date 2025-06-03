import "../../css/day/modActions.css"

import { useState } from "react"

import MafiaGame from "../../GameAPI/mafiaGame";

import { useDayContext } from "../../contexts/DayContext";

function ModActions() {
    const [revivedPlayers, setRevivedPlayers] = useState([]);
    const {modActionsClass, setModActionsClass} = useDayContext();

    function performRevives() {
        MafiaGame.revivePlayers(revivedPlayers);
        MafiaGame.calculateCounts();
        setModActionsClass("hidden");
        setRevivedPlayers([]);
    }

    return (
        <div className={modActionsClass}>
            <div className="mod-actions">
                <button 
                    className="button-default"
                    onClick={() => setModActionsClass("hidden")}
                >Close
                </button>
                <h1>Revive Players:</h1>
                <table>
                    <thead>
                        <tr>
                            <th>Player</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            MafiaGame.players
                                .filter(player => !player.isAlive)
                                .map(player => {
                                    return (
                                        <tr key={player.id}>
                                            <td>{player.name}</td>
                                            <td>
                                                {
                                                    revivedPlayers.includes(player) 
                                                    ?
                                                    <button
                                                        className="remove-revive"
                                                        onClick={() => {
                                                            const playerToRemove = MafiaGame.findPlayerByID(player.id);
                                                            setRevivedPlayers(revivedPlayers.filter(player => player.id !== playerToRemove.id))
                                                        }}
                                                    >Undo?
                                                    </button>
                                                    :
                                                    <button 
                                                        className="revive-button"
                                                        onClick={() => {
                                                            const playerToRevive = MafiaGame.findPlayerByID(player.id);
                                                            setRevivedPlayers(prevRevivedPlayers => [
                                                                ...prevRevivedPlayers,
                                                                playerToRevive
                                                            ]);
                                                        }}
                                                    >Revive?
                                                    </button>
                                                }
                                            </td>
                                        </tr>
                                    )
                                })
                        }
                    </tbody>
                </table>
                <p>These players will revive:</p>
                <ul>
                    {
                        revivedPlayers.map(player => {
                            return <li>{player.name}</li>
                        })
                    }
                </ul>
                <button 
                    className="revive-button"
                    onClick={() => performRevives()}
                >Perform Revive
                </button>
            </div>
        </div>
    )
}

export default ModActions