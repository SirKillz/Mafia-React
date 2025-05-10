import roles from "./roles";

class Player {
    constructor(name) {
        
        // received from initial inputs
        this.name = name;
        this.id = crypto.randomUUID();


        // defaults
        this.role = "Innocent";
        this.isAlive = true;

        this.isInnocent = true;
        this.isMafia = false;
        this.isSpecialInnocent = false;
        this.isSpecialMafia = false;
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
}

export default Player