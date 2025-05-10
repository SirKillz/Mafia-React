import "../../css/table.css"

import MafiaGame from "../../GameAPI/mafiaGame"
import { useNightContext } from "../../contexts/NightContext"

import MafiaKillButton from "./nightActions/MafiaButton";

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
                buttonInfo.element = <button>Consi Check</button>;
                break
            case "Mafia":
                buttonInfo.element = <MafiaKillButton playerObj={playerObj}/>;
                break
            case "Mafia Boss":
                buttonInfo.element = <button>Boss Silence</button>;
                break
            case "Enforcer":
                buttonInfo.element = <button>Enforce</button>;
                break
            case "Spy":
                buttonInfo.element = <button>Spy Check</button>;
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
            if (playerObj.isMafia) {
                return <></>;
            }
            else {
                return buttonInfo.element;
            }
        }
        else if (buttonInfo.name === "Mafia") {
            if (playerObj.isMafia) {
                return <></>
            }
            else {
                return buttonInfo.element;
            }
        }

        else if (buttonInfo.name === "Mafia Boss") {
            return buttonInfo.element;
        }

        else if (buttonInfo.name === "Enforcer") {
            if (playerObj.isMafia) {
                return <></>
            }
            else {
                return buttonInfo.element;
            }
        }

        else if (buttonInfo.name === "Spy") {
            if (playerObj.role === "Spy") {
                return <></>
            }
            else {
                return buttonInfo.element;
            }
        }

        else if (buttonInfo.name === "Medic") {
            return buttonInfo.element;
        }

        else if (buttonInfo.name === "Assassin") {
            if (playerObj.role === "Assassin") {
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