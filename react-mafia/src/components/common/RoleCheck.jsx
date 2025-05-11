import "../../css/night/roleCheck.css"

import { useNightContext } from "../../contexts/NightContext";

function RoleCheck() {
    const {roleCheckOverlayClass, roleCheckResultClass, roleCheckResultText, resetRoleCheckOverlay} = useNightContext();

    return (
        <div className={roleCheckOverlayClass}>
                <div className={roleCheckResultClass}>
                    <h1 className="role-check-result">{roleCheckResultText}</h1>
                    <button className="button-default" onClick={resetRoleCheckOverlay}>Close</button>
                </div>
        </div>
    )
}

export default RoleCheck