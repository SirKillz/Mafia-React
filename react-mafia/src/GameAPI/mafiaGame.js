import Player from "./player";

class MafiaGame {
    constructor() {
        this.players = [];

        // status
        this.aliveCount = 0;
        this.innocentCount = 0;
        this.mafiaCount = 0;
        this.startingMafiaCount = 0;
        this.dayCount = 0;
        this.nightCount = 0;

        // rules
        this.mafiaKillPower = 2;

        // previously acted on players
        this.previousMedicSave = null;
        this.previousEnforcerBlock = null;
        this.previousBossSilence = null;
        this.consiHasChecked = false;
        this.assassinHasShot = false;

        this.lastNightRoutine = {
            deaths: [],
            silencedPlayer: null
        };

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
            "Undercover Cop"
        ]

        const testNames = [
            "Nick",
            "Ryan",
            "Luke",
            "Connor",
            "Colin",
            "Cole",
            "Mike",
            "Matt",
            "Curt"
        ]

        const debugArray = []
        for (let i = 0; i < 9; i++) {
            const testPlayer = new Player(`${testNames[i]}`);
            debugArray.push(testPlayer);
        }

        let index = 0;
        debugArray.forEach(player => {
            player.updateRole(testRoles[index])
            index++
        })

        this.players = debugArray;
        this.updateInitialMafiaCount();
        this.calculateCounts();
    }

    createPlayerObjs(rawPlayerArray) {
        this.players = rawPlayerArray.map(playerName => {
            return new Player(playerName);
        })
    }

    updateInitialMafiaCount() {
        this.players.forEach(player => {
            if (player.isMafia) this.startingMafiaCount += 1;
        })
    }

    updateMafiaKillPower() {
        if (this.mafiaKillPower > 1) {
            if (this.startingMafiaCount !== this.mafiaCount) {
                this.mafiaKillPower--;
            }
        }
    }

    getVoteMajority() {
        if (this.aliveCount - 1 % 2 === 0) {
            return ((this.aliveCount - 1) / 2) + 1;
        }
        else {
            return Math.ceil(this.aliveCount / 2);
        }
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

    performDayRoutine(votedPlayers) {
        this.killPlayers(votedPlayers);
        this.calculateCounts();
        this.updateMafiaKillPower();
        this.dayCount++;
    }

    performNightRoutine(
        killedPlayers, 
        assassinatedPlayers, 
        savedPlayers, 
        enforcedPlayers, 
        silencedPlayers,
        consiHasChecked,
        assassinHasShot
    ) {
        let allKilledPlayers = killedPlayers.concat(assassinatedPlayers); // mafia kills + assassin kills
        
        // check for medic saves
        if (savedPlayers.length > 0) {
            const savedPlayer = savedPlayers[0];
            this.previousMedicSave = savedPlayer.id;

            // filter out the saved player
            const killsAfterSave = allKilledPlayers.filter(player => player.id !== savedPlayer.id);
            allKilledPlayers = killsAfterSave;
        }

        // kill the players
        this.killPlayers(allKilledPlayers);

        // check for enforced players
        if (enforcedPlayers.length > 0) {
            const enforcedPlayer = enforcedPlayers[0];
            this.previousEnforcerBlock = enforcedPlayer.id;
        }

        // check for silenced players
        let silencedPlayer = null;
        if (silencedPlayers.length > 0) {
            silencedPlayer = silencedPlayers[0];
            this.previousBossSilence = silencedPlayer.id;
        }

        // check if the assassin has shot
        if (assassinHasShot) {
            this.assassinHasShot = true;
        }

        // check if the consi has checked
        if (consiHasChecked) {
            this.consiHasChecked = true;
        }

        this.updateMafiaKillPower();

        this.lastNightRoutine.deaths = allKilledPlayers;
        this.lastNightRoutine.silencedPlayer = silencedPlayer;

        this.nightCount++;

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
}

export default new MafiaGame();