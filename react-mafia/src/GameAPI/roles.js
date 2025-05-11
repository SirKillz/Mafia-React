const allInnocentRoles = [
    "Innocent",
    "Spy", 
    "Medic", 
    "Assassin", 
    "Attorney",
    "Undercover Cop"
]

const allMafiaRoles = [
    "Mafia",
    "Mafia Boss",
    "Consigliere",
    "Enforcer"
]

const specialInnocentRoles = [
    "Spy", 
    "Medic", 
    "Assassin",
    "Attorney",
    "Undercover Cop"
]

const specialMafiaRoles = [
    "Mafia Boss",
    "Consigliere",
    "Enforcer"
]



const roles = {
    allInnocentRoles: allInnocentRoles,
    allMafiaRoles: allMafiaRoles,
    specialInnocentRoles: specialInnocentRoles,
    specialMafiaRoles: specialMafiaRoles,
    allRoles: allInnocentRoles.concat(allMafiaRoles)
}

export default roles