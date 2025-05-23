import roles from "./roles";

class Player {
    constructor(name, data = {}) {
        
        // received from initial inputs
        this.name = name;
        this.id = data.id ?? crypto.randomUUID();


        // defaults
        this.role = data.role ?? "Innocent";
        this.isAlive = data.isAlive?? true;
        this.canPerformAction = data.canPerformAction ?? true;
        this.daysSurvived = data.daysSurvived ?? 0;
        this.nightsSurvived = data.nightsSurvived ?? 0;

        this.isInnocent = data.isInnocent ?? true;
        this.isMafia = data.isMafia ?? false;
        this.isSpecialInnocent = data.isSpecialInnocent ?? false;
        this.isSpecialMafia = data.isSpecialMafia ?? false;

        // role specific stats
        // each index in the array represents a night turn
        this.spyMafiaHitPercentage = data.spyMafiaHitPercentage ?? []; 
        this.medicSavePercentage = data.medicSavePercentage ?? [];
        this.medicSelfSavePercentage = data.medicSelfSavePercentage ?? [];
        this.assassinMafiaHitPercentage = data.assassinMafiaHitPercentage ?? [];
    }

    toJSON() {
        return {
            name: this.name,
            id: this.id,
            role: this.role,
            isAlive: this.isAlive,
            canPerformAction: this.canPerformAction,
            daysSurvived: this.daysSurvived,
            nightsSurvived: this.nightsSurvived,
            isInnocent: this.isInnocent,
            isMafia: this.isMafia,
            isSpecialInnocent: this.isSpecialInnocent,
            isSpecialMafia: this.isSpecialMafia,
            spyMafiaHitPercentage: this.spyMafiaHitPercentage,
            medicSavePercentage: this.medicSavePercentage,
            medicSelfSavePercentage: this.medicSelfSavePercentage,
            assassinMafiaHitPercentage: this.assassinMafiaHitPercentage
        }

    }

    _roleStateReset() {
        this.isMafia = false;
        this.isSpecialMafia = false;
        this.isInnocent = false;
        this.isSpecialInnocent = false;
    }

    updateRole(newRole) {
        this.role = newRole;
        this._roleStateReset();

        // Perform Innocent Role Checks
        if (roles.allInnocentRoles.includes(newRole)) {
            this.isInnocent = true;
            if (roles.specialInnocentRoles.includes(newRole)) {
                this.isSpecialInnocent = true;
            }
            return
        }

        // Perform Mafia Role Checks
        if (roles.allMafiaRoles.includes(newRole)) {
            this.isMafia = true;
            if (roles.specialMafiaRoles.includes(newRole)) {
                this.isSpecialMafia = true;
            }
            return
        }
    }

    killPlayer() {
        this.isAlive = false;
    }

    enableSpecialAction() {
        this.canPerformAction = true;
    }

    disableSpecialAction() {
        this.canPerformAction = false;
    }

    incrementsDaysSurvived() {
        this.daysSurvived++;
    }
    incrementNightsSurvived() {
        this.nightsSurvived++;
    }
}

export default Player