import Player from "./player";

const debugArray = [
    {
        "name": "Nick",
        "id": "2e24630a-ae25-4f58-98a4-2211d3db9caf",
        "role": "Mafia Boss",
        "isAlive": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": true
    },
    {
        "name": "Ryan",
        "id": "077f68ca-e157-4c05-85c5-402faea7aaf2",
        "role": "Consigliere",
        "isAlive": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": true
    },
    {
        "name": "Luke",
        "id": "f065338b-707b-47ba-a679-df552b8a7105",
        "role": "Enforcer",
        "isAlive": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": true
    },
    {
        "name": "Connor",
        "id": "d311a74a-3e03-446f-bb0f-c0c6e07263e5",
        "role": "Spy",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Colin",
        "id": "06886d84-a016-47c7-801e-c46234691bd4",
        "role": "Medic",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Cole",
        "id": "b30eff9c-caea-4217-a3b2-14fb2ac60d02",
        "role": "Assassin",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Mike",
        "id": "b3306e46-2d4e-4e88-b452-0fb0816aa437",
        "role": "Innocent",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Matt",
        "id": "389d9c40-e007-40fb-86c2-fc2012cd43a8",
        "role": "Innocent",
        "isAlive": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Curt",
        "id": "2c8b098e-3032-4a19-913c-79bbeaa44b96",
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