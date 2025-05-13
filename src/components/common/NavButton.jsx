import { useNav } from "../../contexts/NavContext"

function NavButton({text, className, nextPage}) {
    const { updateView } = useNav();

    return (
        <button 
            className={className}
            onClick={() => updateView(nextPage)}
        >
            {text}
        </button>
    )
}

export default NavButton