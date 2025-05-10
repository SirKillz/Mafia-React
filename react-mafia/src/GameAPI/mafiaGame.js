import Player from "./player";

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

        // previously acted on players
        this.previousMedicSave = null;
        this.previousEnforcerBlock = null;
        this.consiHasChecked = false;
        this.assassinHasShot = false;

    }

    swapDebugArray() {
        const testRoles = [
            "Consigliere",
            "Mafia Boss",
            "Enforcer",
            "Spy",
            "Medic",
            "Assassin",
            "Innocent",
            "Innocent",
            "Innocent"
        ]

        const debugArray = []
        for (let i = 0; i < 9; i++) {
            const testPlayer = new Player(`Player ${i}`);
            debugArray.push(testPlayer);
        }

        let index = 0;
        debugArray.forEach(player => {
            player.updateRole(testRoles[index])
            index++
        })

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
        player.disableSpecialAction();
    }

    enablePlayerAction(playerId) {
        const player = this.findPlayerByID(playerId);
        player.enableSpecialAction();
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