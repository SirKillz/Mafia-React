const allInnocentRoles = [
    "Innocent",
    "Undercover Cop",
    "Spy", 
    "Medic", 
    "Assassin", 
    "Attorney",
    "Guild Member"
]

const allMafiaRoles = [
    "Mafia",
    "Mafia Boss",
    "Consigliere",
    "Enforcer"
]

const specialInnocentRoles = [
    "Undercover Cop",
    "Spy", 
    "Medic", 
    "Assassin",
    "Attorney",
    "Guild Member"
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