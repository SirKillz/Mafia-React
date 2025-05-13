import { createContext, useContext, useState, } from "react";

const NavContext = createContext({
    view: null,
    updateView: () => {}
})

export function NavProvider({children}) {
    const [view, setView] = useState("welcome");

    const updateView = (toPage) => {
        setView(toPage);
    }

    return (
        <NavContext.Provider value={{ view, updateView }}>
            {children}
        </NavContext.Provider >
    )
}

// eslint-disable-next-line react-refresh/only-export-components
export function useNav() {
    return useContext(NavContext)
}