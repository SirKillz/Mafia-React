import React, { useState, useEffect } from "react";
import Select from "react-select";

import "../css/playerEntry.css";
import "../css/formControls.css";

import BACKENDAPI from "../GameAPI/backendAPI";
import MafiaGame from "../GameAPI/mafiaGame";
import { useNav } from "../contexts/NavContext";

function PlayerEntry() {
  const [playerCount, setPlayerCount] = useState(0);
  const [killPower, setKillPower]     = useState(1);
  const [slots, setSlots]             = useState([]);
  const [allPlayers, setAllPlayers]   = useState([]);
  const [submitClass, setSubmitClass] = useState("hidden");
  const { updateView }                = useNav();

  // Load existing players on mount
  useEffect(() => {
    BACKENDAPI.getPlayers()
      .then(setAllPlayers)
      .catch((err) => console.error("Could not fetch players:", err));
  }, []);

  // Rebuild slots when count changes
  const handlePlayerCountChange = (e) => {
    const count = parseInt(e.target.value, 10) || 0;
    setPlayerCount(count);
    setSlots(
      Array.from({ length: count }, () => ({
        selectedOption: { value: "NEW", label: "NEW" },
        customName: "",
      }))
    );
    setSubmitClass("button-default");
  };

  const handleKillPowerChange = (e) => {
    const kp = parseInt(e.target.value, 10) || 1;
    setKillPower(kp);
    MafiaGame.mafiaKillPower = kp;
    MafiaGame.initialMafiaKillPower = kp;
  };

  // Build options array: NEW first, then fetched players
  const options = [
    { value: "NEW", label: "NEW" },
    ...allPlayers.map((p) => ({
      value: String(p.player_id),
      label: p.player_name,
    })),
  ];

  // When user picks from dropdown
  const handleSelectChange = (idx, option) => {
    setSlots((prev) => {
      const copy = [...prev];
      copy[idx] = { selectedOption: option, customName: "" };
      return copy;
    });
  };

  // When user types a new player name
  const handleCustomNameChange = (idx, value) => {
    setSlots((prev) => {
      const copy = [...prev];
      copy[idx] = { ...copy[idx], customName: value };
      return copy;
    });
  };

  // Submission: ensure every slot has a name
  const handleFormSubmit = (e) => {
    e.preventDefault();
    try {
      const names = slots.map((slot, i) => {
        if (slot.selectedOption.value === "NEW") {
          if (!slot.customName.trim()) {
            throw new Error(`Missing name for new slot ${i + 1}`);
          }
          return slot.customName.trim();
        }
        return slot.selectedOption.label;
      });
      MafiaGame.createPlayerObjs(names);
      updateView("roleEntry");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="player-entry">
      <div className="count">
        <h1 className="page-title">Player Setup</h1>
        <div className="rule-entry">
          <div className="input-row">
            <label htmlFor="player-count"># of Players:</label>
            <input
              id="player-count"
              type="number"
              min="0"
              className="input-small"
              placeholder="0"
              onChange={handlePlayerCountChange}
            />
          </div>
          <div className="input-row">
            <label htmlFor="kill-power">Mafia Kill Power:</label>
            <input
              id="kill-power"
              type="number"
              min="1"
              max="2"
              className="input-small"
              onChange={handleKillPowerChange}
            />
          </div>
        </div>
      </div>

      <form className="player-inputs" onSubmit={handleFormSubmit}>
        {slots.map((slot, idx) => (
          <div key={idx} className="player-select-row">
            <label>Player {idx + 1}:</label>
            <Select
              className="select-med player-select"
              classNamePrefix="react-select"
              options={options}
              value={slot.selectedOption}
              onChange={(opt) => handleSelectChange(idx, opt)}
              isSearchable
              placeholder="Select or search..."
            />
            {slot.selectedOption.value === "NEW" && (
              <input
                type="text"
                className="input-med"
                placeholder="Enter new player name"
                value={slot.customName}
                onChange={(e) =>
                  handleCustomNameChange(idx, e.target.value)
                }
              />
            )}
          </div>
        ))}

        <button type="submit" className={submitClass}>
          Role Entry
        </button>
      </form>
    </div>
  );
}

export default PlayerEntry;
