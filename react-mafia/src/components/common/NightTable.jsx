import "../../css/table.css"

import MafiaGame from "../../GameAPI/mafiaGame"
import { useNightContext } from "../../contexts/NightContext"

import ConsiCheckButton from "./nightActions/ConsiCheckButton";
import MafiaKillButton from "./nightActions/MafiaButton";
import EnforcerBlockButton from "./nightActions/EnforcerBlockButton";
import SpyCheckButton from "./nightActions/SpyCheckButton";

function NightTable() {
    const { actingRole } = useNightContext();

    function getButtonForActingRole(playerObj, actingRole) {
        
        let buttonInfo = {
            name: actingRole,
            element: <></>
        };

        // actingRole is the Role that currently has their head up during he night
        switch(actingRole) {
            case "Consigliere":
                buttonInfo.element = <ConsiCheckButton playerObj={playerObj}/>;
                break
            case "Mafia":
                buttonInfo.element = <MafiaKillButton playerObj={playerObj}/>;
                break
            case "Mafia Boss":
                buttonInfo.element = <button>Boss Silence</button>;
                break
            case "Enforcer":
                buttonInfo.element = <EnforcerBlockButton playerObj={playerObj}/>
                break
            case "Spy":
                buttonInfo.element = <SpyCheckButton playerObj={playerObj}/>;
                break
            case "Medic":
                buttonInfo.element = <button>Medic</button>;
                break
            case "Assassin":
                buttonInfo.element = <button>Assassin</button>;
                break
            default:
                buttonInfo.element = <></>;

            
        }

        if (buttonInfo.name === "Consigliere") {
            if (playerObj.isMafia || !playerObj.isAlive) {
                return <></>;
            }
            else {
                return buttonInfo.element;
            }
        }
        else if (buttonInfo.name === "Mafia") {
            if (playerObj.isMafia || !playerObj.isAlive) {
                return <></>
            }
            else {
                return buttonInfo.element;
            }
        }

        else if (buttonInfo.name === "Mafia Boss") {
            if (!playerObj.isAlive) {
                return <></>
            }
            else {
              return buttonInfo.element;  
            }
        }

        else if (buttonInfo.name === "Enforcer") {
            if (playerObj.isMafia || !playerObj.isAlive) {
                return <></>
            }
            else {
                return buttonInfo.element;
            }
        }

        else if (buttonInfo.name === "Spy") {
            if (playerObj.role === "Spy" || !playerObj.isAlive) {
                return <></>
            }
            else {
                return buttonInfo.element;
            }
        }

        else if (buttonInfo.name === "Medic") {
            if (!playerObj.isAlive) {
                return <></>
            }
            else {
               return buttonInfo.element; 
            }
        }

        else if (buttonInfo.name === "Assassin") {
            if (playerObj.role === "Assassin" || !playerObj.isAlive) {
                return <></>
            }
            else {
                return buttonInfo.element;
            }
        }
        else {
            return buttonInfo.element
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    <th>Player Name</th>
                    <th>Player Role</th>
                    <th>Night Action</th>
                </tr>
            </thead>
            <tbody>
                {
                    MafiaGame.players.map(player => {
                        return (
                            <tr key={player.id}>
                                <td className={player.isAlive ? "alive": "dead"}>{player.name}</td>
                                <td className={player.isAlive ? "alive": "dead"}>{player.role}</td>
                                <td>
                                    {getButtonForActingRole(player, actingRole)}
                                </td>
                            </tr>
                        )
                    })
                }
            </tbody>
        </table>
    )
}

export default NightTable