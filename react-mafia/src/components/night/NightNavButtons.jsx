import "../../css/night/nightNavButtons.css"

import MafiaGame from "../../GameAPI/mafiaGame"

import { useNightContext } from "../../contexts/NightContext"

function NightNavButtons()  {
    const {updateActingRole} = useNightContext()

    return (
        <div className="night-nav-buttons">
            {
                MafiaGame.roleIsPresent("Consigliere") 
                    ? 
                        <button 
                            className="night-nav-button consigliere-nav-button" 
                            onClick={() => updateActingRole("Consigliere")}
                        >
                            Consigliere
                        </button>
                    :   <></>
            }

            {
                <button 
                    className="night-nav-button mafia-nav-button" 
                    onClick={() => updateActingRole("Mafia")}
                >
                    Mafia
                </button>
            }
            {
                MafiaGame.roleIsPresent("Mafia Boss") 
                    ? 
                        <button 
                            className="night-nav-button mafia-boss-nav-button" 
                            onClick={() => updateActingRole("Mafia Boss")}
                        >
                            Mafia Boss
                        </button>
                    : <></>
            }

            {
                MafiaGame.roleIsPresent("Enforcer") 
                    ? <button 
                        className="night-nav-button enforcer-nav-button" 
                        onClick={() => updateActingRole("Enforcer")}
                    >
                        Enforcer
                    </button>
                    : <></>
            }

            {
                (MafiaGame.roleIsPresent("Undercover Cop") && MafiaGame.dayCount === 1)
                    ? <button 
                        className="night-nav-button cop-nav-button" 
                        onClick={() => updateActingRole("Undercover Cop")}
                    >
                        Undercover Cop
                    </button>
                    : <></>
            }

            {
                MafiaGame.roleIsPresent("Spy") 
                    ? <button 
                        className="night-nav-button spy-nav-button" 
                        onClick={() => updateActingRole("Spy")}
                    >
                        Spy
                    </button>
                    : <></>
            }

            {
                MafiaGame.roleIsPresent("Medic") 
                    ? <button 
                        className="night-nav-button medic-nav-button" 
                        onClick={() => updateActingRole("Medic")}
                    >
                        Medic
                    </button>
                    : <></>
            }
            
            {
                MafiaGame.roleIsPresent("Assassin") 
                    ? <button 
                        className="night-nav-button assassin-nav-button" 
                        onClick={() => updateActingRole("Assassin")}
                    >
                        Assassin
                    </button>
                    : <></>
            }
        </div>
    )
}

export default NightNavButtons