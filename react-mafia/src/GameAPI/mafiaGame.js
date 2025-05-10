import Player from "./player";

const debugArray = [
    {
        "name": "Nick",
        "id": "5f678a4d-e29d-4047-9d79-1992ba6f1ae1",
        "role": "Mafia Boss",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": true
    },
    {
        "name": "Ryan",
        "id": "f2a86403-3094-491e-b0ac-91e0ca6fa0da",
        "role": "Consigliere",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": true
    },
    {
        "name": "Luke",
        "id": "63e7e6b4-5135-4cff-9529-2256612cffe8",
        "role": "Enforcer",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": false,
        "isMafia": true,
        "isSpecialInnocent": false,
        "isSpecialMafia": true
    },
    {
        "name": "Connor",
        "id": "f87bca32-b5f9-4d81-8908-ebce38fec493",
        "role": "Spy",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Colin",
        "id": "8f7598cc-6fba-4999-9b53-da8afe9e50b4",
        "role": "Medic",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Cole",
        "id": "a53a106d-162d-4350-8684-edac939b49e8",
        "role": "Assassin",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": true,
        "isSpecialMafia": false
    },
    {
        "name": "Mike",
        "id": "9e165a37-82e6-4f85-a892-23a434b95678",
        "role": "Innocent",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Matt",
        "id": "b3112e6c-f313-4f13-ada5-c93ac9df67b4",
        "role": "Innocent",
        "isAlive": true,
        "canPerformAction": true,
        "isInnocent": true,
        "isMafia": false,
        "isSpecialInnocent": false,
        "isSpecialMafia": false
    },
    {
        "name": "Curt",
        "id": "aabfad7b-273c-4e32-96c7-49f130d75ae2",
        "role": "Innocent",
        "isAlive": true,
        "canPerformAction": true,
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

    findPlayerByRole(playerRole) {
        return this.players.find(player => player.role === playerRole);
    }

    roleIsPresent(role) {
        return this.players.some(player => player.role === role);
    }

    killPlayers(playerArray) {
        playerArray.forEach(player => player.killPlayer());
    }

    disablePlayerAction(playerId) {
        const player = this.findPlayerByID(playerId);
        player.disablePlayerAction();
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