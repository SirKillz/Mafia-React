import "../../css/table.css"

import MafiaGame from "../../GameAPI/mafiaGame"
import { useNightContext } from "../../contexts/NightContext"

import ConsiCheckButton from "./nightButtons/ConsiCheckButton";
import MafiaKillButton from "./nightButtons/MafiaButton";
import EnforcerBlockButton from "./nightButtons/EnforcerBlockButton";
import BossSilenceButton from "./nightButtons/BossSilenceButton";
import SpyCheckButton from "./nightButtons/SpyCheckButton";
import MedicSaveButton from "./nightButtons/MedicSaveButton";
import AssassinKillButton from "./nightButtons/assassinKillButton";

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
                buttonInfo.element = <BossSilenceButton playerObj={playerObj}/>;
                break
            case "Enforcer":
                buttonInfo.element = <EnforcerBlockButton playerObj={playerObj}/>
                break
            case "Spy":
                buttonInfo.element = <SpyCheckButton playerObj={playerObj}/>;
                break
            case "Medic":
                buttonInfo.element = <MedicSaveButton playerObj={playerObj}/>;
                break
            case "Assassin":
                buttonInfo.element = <AssassinKillButton playerObj={playerObj}/>
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