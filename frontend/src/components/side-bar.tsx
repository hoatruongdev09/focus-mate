import { useState } from "react";
import ChevronLeftIcon from "../Icon/chevron-left-icon";

function SideBar() {

    const [isOpen, setIsOpen] = useState(true)

    return (
        <div className={`h-full ${isOpen ? "w-64" : "w-16"} border bg-white p-2 relative transition-all duration-300`}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute right-2 bottom-2 ${isOpen ? "rotate-0" : "rotate-180"} transition-transform duration-300 delay-300`}>
                <ChevronLeftIcon />
            </button>
        </div>
    );
}

export default SideBar;