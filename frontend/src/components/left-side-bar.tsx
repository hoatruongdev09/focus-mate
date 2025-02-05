import { useState } from "react";
import ChevronLeftIcon from "../Icon/chevron-left-icon";
import { Board } from "../types/board-type";

interface Props {
    board: Board
}

function LeftSideBar(props: Props) {
    const [isOpen, setIsOpen] = useState(true)
    const { board } = props

    let bgStyle: React.CSSProperties | undefined = undefined
    console.log("board theme: ", board)
    if (board.theme) {
        bgStyle = { background: `${board.theme.fg_value}` }
    } else {
        bgStyle = { background: "#fff" }
    }

    return (
        <div
            style={bgStyle}
            className={`h-full ${isOpen ? "w-64" : "w-16"} border-r border-gray-300 border-opacity-50 p-2 relative transition-all duration-300`}
        >
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={`absolute right-2 bottom-2 ${isOpen ? "rotate-0" : "rotate-180"} transition-transform duration-300 delay-300`}>
                <ChevronLeftIcon />
            </button>
        </div>
    );
}

export default LeftSideBar;