import "../css/playerEntry.css"
import "../css/formControls.css"

import { useState } from "react";

import MafiaGame from "../GameAPI/mafiaGame";
import { useNav } from "../contexts/NavContext";

function PlayerEntry() {
  const [playerCount, setPlayerCount] = useState("");
  const [killPower, setKillPower] = useState("");
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
    setSubmitClass("button-default");     // show the button
  };

  const handleKillPowerChange = (e) => {
    const newKillPower = parseInt(e.target.value, 10) || 0
    setKillPower(newKillPower);
    MafiaGame.mafiaKillPower = newKillPower;
  }

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
          <div className="rule-entry">
            <div className="input-row">
              <label htmlFor="player-count">Enter the number of players:</label>
              <input
                id="player-count"
                className="input-small"
                type="number"
                min="0"
                placeholder="# of Players"
                onChange={handlePlayerCountChange}
              />
            </div>
            <div className="input-row">
              <label htmlFor="kill-power">Enter the Mafia's Kill Power:</label>
              <input
                id="kill-power"
                className="input-small"
                type="number"
                min="1"
                max="2"
                placeholder="Mafia Kill Power"
                onChange={handleKillPowerChange}
              />
            </div>
          </div>
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
            onKeyDown={e => {
              if (e.key === 'Enter') {
                e.preventDefault();                            // don’t submit yet
                const nextInput = players.current[index + 1];
                if (nextInput) nextInput.focus();              // focus next if it exists
              }
            }}
            enterKeyHint="next"
          />
        ))}


        <button type="submit" className={submitClass}>Role Entry</button>
      </form>
    </div>
  );
}

export default PlayerEntry;
