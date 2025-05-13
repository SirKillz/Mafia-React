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
}

export default StatManager