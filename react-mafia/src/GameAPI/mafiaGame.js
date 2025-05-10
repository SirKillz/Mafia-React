import Player from "./player";

const debugArray = [
    {
        "name": "Nick",
        "id": "17631be6-09de-48b3-b337-1e583508d41d",
        "role": "Mafia",
        "isAlive": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Ryan",
        "id": "2a70b88f-8b85-4d47-bcb4-dc45b3dce1f9",
        "role": "Mafia",
        "isAlive": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Connor",
        "id": "79511275-0657-495e-8cdf-16a9106886d6",
        "role": "Mafia",
        "isAlive": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Colin",
        "id": "6fbabd1a-61cf-4c29-8132-43a8dbb17aa0",
        "role": "Spy",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Cole",
        "id": "cc277eed-374f-4b65-8420-00d77d5a6371",
        "role": "Medic",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Mike",
        "id": "3876cc02-49ab-4975-b17f-c67e131e547f",
        "role": "Assassin",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Matt",
        "id": "d30b9049-c79e-4164-b147-28174b97af96",
        "role": "Innocent",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Curt",
        "id": "54b58c4c-4820-4aff-a498-c3720e3a4a76",
        "role": "Innocent",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Luke",
        "id": "01b6ae62-a79a-4adc-b692-0e070e04b532",
        "role": "Innocent",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    }
]

class MafiaGame {
    constructor() {
        this.players = [];

        // status
        this.gamePhase = "night";
        this.aliveCount = 0;
        this.innocentCount = 0;
        this.mafiaCount = 0;

        // rules
        this.mafiaKillPower = 2;

    }

    swapDebugArray() {
        this.players = debugArray;
    }

    createPlayerObjs(rawPlayerArray) {
        this.players = rawPlayerArray.map(playerName => {
            return new Player(playerName);
        })
    }

    findPlayerByID(playerId) {
        return this.players.find(player => player.id === playerId);
    }

    roleIsPresent(role) {
        return this.players.some(player => player.role === role);
    }

    killPlayers(playerArray) {
        playerArray.forEach(player => player.killPlayer());
    }

    calculateCounts() {
        this.aliveCount = 0;
        this.innocentCount = 0;
        this.mafiaCount = 0;

        this.players.forEach(player => {
            // update alive players
            if (player.isAlive) {
                this.aliveCount++;
            }

            // update alive Innocent Players
            if (player.isAlive && player.isInnocent) {
                this.innocentCount++;
            }

            // update alive Mafia Players
            if (player.isAlive && player.isMafia) {
                this.mafiaCount++;
            }
        })
    }

    checkGameOver() {
        
        // check for innocent win
        if (this.mafiaCount === 0) {
            return {
                isGameOver: true,
                winningTeam: "Innocent"
            }
        }

        // check for mafia win
        if (this.mafiaCount / this.aliveCount >= 0.5) {
            return {
                isGameOver: true,
                winningTeam: "Mafia"
            }
        }

        return {
            isGameOver: false,
            winningTeam: null
        }
    }

    getGamePhase() {
        return this.gamePhase;
    }

    updateGamePhase(newPhase) {
        this.gamePhase = newPhase;
    }
}

export default new MafiaGame();