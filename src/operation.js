import Player from "./GameAPI/player";

const STORAGE_KEY = "mafiaGameState";

export function saveGame(gameState) {
    const rawJSON = JSON.stringify(gameState);
    localStorage.setItem(STORAGE_KEY, rawJSON);
}

export function loadGame(gameState) {
    const rawJSON = localStorage.getItem(STORAGE_KEY);
    if (!rawJSON) return false;

    const data = JSON.parse(rawJSON);

    gameState.players = data.players.map(playerData => new Player(playerData.name, playerData));

    // status
    gameState.gamePhase = data.gamePhase;
    gameState.aliveCount = data.aliveCount;
    gameState.innocentCount = data.innocentCount;
    gameState.mafiaCount = data.mafiaCount;
    gameState.startingMafiaCount = data.startingMafiaCount;
    gameState.dayCount = data.dayCount;
    gameState.nightCount = data.nightCount;

    // rules
    gameState.mafiaKillPower = data.mafiaKillPower; //defaults to one kill power can be overwritten during player entry

    // previously acted on players
    gameState.previousMedicSave = data.previousMedicSave;
    gameState.previousEnforcerBlock = data.previousEnforcerBlock;
    gameState.previousBossSilence = data.previousBossSilence;
    gameState.consiHasChecked = data.consiHasChecked;
    gameState.assassinHasShot = data.assassinHasShot;
    gameState.attorneyHasDefended = data.attorneyHasDefended;

    gameState.lastNightRoutine = data.lastNightRoutine;

    return true;
}