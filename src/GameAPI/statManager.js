import MafiaGame from "./mafiaGame";

class StatManager {
    constructor() {

    }

    recordSpyCheckStat(spyCheckedPlayer) {
        if (spyCheckedPlayer) {
            const checkedPlayer = MafiaGame.findPlayerByID(spyCheckedPlayer.id);
            const spyPlayer = MafiaGame.findPlayerByRole("Spy");

            if (checkedPlayer.isMafia) {
                spyPlayer.spyMafiaHitPercentage.push(true);
            }
            else {
                spyPlayer.spyMafiaHitPercentage.push(false);
            }
        }
    }

    recordMedicSaveStat(killedPlayers, savedPlayers) {
        if (savedPlayers.length > 0) {
            const medicPlayer = MafiaGame.findPlayerByRole("Medic");
            const savedPlayer = savedPlayers[0];

            for (let i=0; i<killedPlayers.length; i++) {
                if (killedPlayers[i].id === savedPlayer.id) {
                    // indicates accurate save
                    medicPlayer.medicSavePercentage.push(true);
                    return
                }
            }
            medicPlayer.medicSavePercentage.push(false);

        }

    }

    recordMedicSelfSaveStat(savedPlayers) {
        if (savedPlayers.length > 0) {
            const medicPlayer = MafiaGame.findPlayerByRole("Medic");
            const savedPlayer = savedPlayers[0];

            if (medicPlayer.id === savedPlayer.id) {
                medicPlayer.medicSelfSavePercentage.push(true);
            }
            else {
                medicPlayer.medicSelfSavePercentage.push(false);
            }
        }
    }

    recordAssassinMafiaHitPercentage(assassinatedPlayers) {
        if (assassinatedPlayers.length > 0) {
            const assassinPlayer = MafiaGame.findPlayerByRole("Assassin");
            const assassinatedPlayer = assassinatedPlayers[0];

            if (assassinatedPlayer.isMafia) {
                assassinPlayer.assassinMafiaHitPercentage.push(true);
            }
            else {
                assassinPlayer.assassinMafiaHitPercentage.push(false);
            }
        }
    }
}

export default StatManager