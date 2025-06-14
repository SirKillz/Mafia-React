import Player from "./player";
import StatManager from "./statManager";
import { saveGame } from "../operation";

import BACKENDAPI from "./backendAPI";

class MafiaGame {
    constructor() {
        this.players = [];

        // status
        this.gamePhase = "day";
        this.aliveCount = 0;
        this.innocentCount = 0;
        this.mafiaCount = 0;
        this.startingMafiaCount = 0;
        this.dayCount = 0;
        this.nightCount = 0;

        // rules
        this.mafiaKillPower = 2; //defaults to one kill power can be overwritten during player entry
        this.initialMafiaKillPower = 2;

        // previously acted on players
        this.previousMedicSave = null;
        this.previousEnforcerBlock = null;
        this.previousBossSilence = null;
        this.consiHasChecked = false;
        this.assassinHasShot = false;
        this.attorneyHasDefended = false;

        this.lastNightRoutine = {
            deaths: [],
            silencedPlayer: null
        };

        this.winningTeam = null;

    }

    toJSON() {
        return {
            players: this.players.map(player => player.toJSON()),
            gamePhase: this.gamePhase,
            aliveCount: this.aliveCount,
            innocentCount: this.innocentCount,
            mafiaCount: this.mafiaCount,
            startingMafiaCount: this.startingMafiaCount,
            dayCount: this.dayCount,
            nightCount: this.nightCount,
            mafiaKillPower: this.mafiaKillPower,
            initialMafiaKillPower: this.initialMafiaKillPower,
            previousMedicSave: this.previousMedicSave,
            previousEnforcerBlock: this.previousEnforcerBlock,
            previousBossSilence: this.previousBossSilence,
            consiHasChecked: this.consiHasChecked,
            assassinHasShot: this.assassinHasShot,
            attorneyHasDefended: this.attorneyHasDefended,
            lastNightRoutine: this.lastNightRoutine,
            winningTeam: this.winningTeam
        }
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
            "Attorney"
        ]

        const testNames = [
            "Nick Killeen",
            "Ryan O'Meara",
            "Luke Hecht",
            "Connor Burns",
            "Colin Leschman",
            "Cole Bateman",
            "Mike Bovard",
            "Matt Bovard",
            "Curt Hasan"
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

    clearEnforcements() {
        this.players.forEach(player => player.enableSpecialAction());
    }

    revivePlayers(revivedPlayersArray) {
        revivedPlayersArray.forEach(player => player.isAlive = true);
    }

    performDayRoutine(votedPlayers, attorneyDefenseUsed) {
        this.killPlayers(votedPlayers);

        this.players.forEach(player => {
            if (player.isAlive) {
                player.incrementsDaysSurvived();
            }
        })

        this.calculateCounts();
        this.updateMafiaKillPower();

        if (attorneyDefenseUsed) this.attorneyHasDefended = true;

        this.dayCount++;
        this.gamePhase = "night";

        // save the mafia game instance
        saveGame(this);
    }

    performNightRoutine(
        killedPlayers, 
        assassinatedPlayers, 
        savedPlayers, 
        enforcedPlayers, 
        silencedPlayers,
        consiHasChecked,
        assassinHasShot,
        spyCheckedPlayer,
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
        else {
            this.previousMedicSave = null;
        }

        // kill the players
        this.killPlayers(allKilledPlayers);

        // increment the night count for the alive players
        this.players.forEach(player => {
            if (player.isAlive) {
                player.incrementNightsSurvived();
            }
        })

        // check for enforced players
        if (enforcedPlayers.length > 0) {
            const enforcedPlayer = enforcedPlayers[0];
            this.previousEnforcerBlock = enforcedPlayer.id;
        }
        else {
            this.previousEnforcerBlock = null;
        }

        // check for silenced players
        let silencedPlayer = null;
        if (silencedPlayers.length > 0) {
            silencedPlayer = silencedPlayers[0];
            this.previousBossSilence = silencedPlayer.id;
        }
        else {
            this.previousBossSilence = null;
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

        // reset enforcements for next night
        this.clearEnforcements();

        this.nightCount++;
        this.gamePhase = "day";

        // perform stat updates
        const statManager = new StatManager();
        statManager.recordSpyCheckStat(spyCheckedPlayer);
        statManager.recordMedicSaveStat(killedPlayers, savedPlayers);
        statManager.recordMedicSelfSaveStat(savedPlayers);
        statManager.recordAssassinMafiaHitPercentage(assassinatedPlayers);

        // save the game instance
        saveGame(this);
    }

    checkGameOver() {
        
        // check for innocent win
        if (this.mafiaCount === 0) {
        
            this.winningTeam = "Innocent";
            if (import.meta.env.VITE_ENV === "dev") console.log(this);
            BACKENDAPI.createResults(this);

            return {
                isGameOver: true,
                winningTeam: "Innocent"
            }
        }

        // check for mafia win
        if (this.mafiaCount / this.aliveCount >= 0.5) {

            this.winningTeam = "Mafia";
            if (import.meta.env.VITE_ENV === "dev") console.log(this);
            BACKENDAPI.createResults(this);

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

    resetGame() {
        // reset players to default state
        const currentPlayerNames = this.players.map(player => player.name);
        this.createPlayerObjs(currentPlayerNames);

        this.gamePhase = "day";
        this.aliveCount = 0;
        this.innocentCount = 0;
        this.mafiaCount = 0;
        this.startingMafiaCount = 0;
        this.dayCount = 0;
        this.nightCount = 0;

        this.mafiaKillPower = 2;

        this.previousMedicSave = null;
        this.previousEnforcerBlock = null;
        this.previousBossSilence = null;
        this.consiHasChecked = false;
        this.assassinHasShot = false;
        this.attorneyHasDefended = false;

        this.lastNightRoutine = {
            deaths: [],
            silencedPlayer: null
        };

        this.winningTeam = null;
    }
}

export default new MafiaGame();