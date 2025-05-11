import "../css/playerEntry.css"
import "../css/formControls.css"

import { useState } from "react";

import MafiaGame from "../GameAPI/mafiaGame";
import { useNav } from "../contexts/NavContext";

function PlayerEntry() {
  const [playerCount, setPlayerCount] = useState(0);
  const [players, setPlayers]       = useState([]);
  const [submitClass, setSubmitClass] = useState("hidden");
  const { updateView } = useNav();

  // Called when the # input changes:
  const handlePlayerCountChange = (e) => {
    // 1) Parse the new count as a number:
    const newCount = parseInt(e.target.value, 10) || 0;

    // 2) Build an array of exactly newCount empty strings:
    //    ['','',...]
    const newPlayers = Array(newCount).fill("");

    // 3) Update state in one batch:
    setPlayerCount(newCount);
    setPlayers(newPlayers);
    setSubmitClass("");     // show the button
  };

  // Update one player’s name at index:
  function handleInputChange(index, newValue) {
    const updated = players.slice();  // copy
    updated[index] = newValue;        // set that slot
    setPlayers(updated);
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    for (let i=0; i<players.length; i++) {
        if (players[i] === "") {
            alert(`Missing player name at Player ${i + 1}`);
            return
        }
    }

    MafiaGame.createPlayerObjs(players);
    updateView("roleEntry");
  }

  return (
    <div className="player-entry">
      <div className="count">
          <h1 className="page-title">Player Count:</h1>
          <button>Debug</button>
          <input
            id="player-count"
            className="input-small"
            type="number"
            min="0"
            value={playerCount}
            onChange={handlePlayerCountChange}
          />
      </div>

      <form className="player-inputs" onSubmit={handleFormSubmit}>
        {players.map((name, index) => (
          <input
            key={index}
            className="input-med"
            type="text"
            placeholder={`Player ${index + 1} Name`}
            value={name}
            onChange={(e) =>
              handleInputChange(index, e.target.value)
            }
          />
        ))}


        <button type="submit" className={submitClass}>Submit</button>
      </form>
    </div>
  );
}

export default PlayerEntry;
