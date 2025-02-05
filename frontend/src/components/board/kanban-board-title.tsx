import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import { Board } from "../../types/board-type";
import { EllipsisHorizontalIcon } from "@heroicons/react/16/solid";

interface Props {
    board: Board
    showSideBar: () => void
}

function KanbanBoardTitle(props: Props) {
    const { board, showSideBar } = props

    let bgStyle: React.CSSProperties | undefined = undefined
    console.log("board theme: ", board)
    if (board.theme) {
        bgStyle = { background: `${board.theme.fg_value}80` }
    } else {
        bgStyle = { background: "#fff" }
    }

    return (
        <div
            style={bgStyle}
            className="
                        w-full border border-t-0 border-l-0 border-gray-300
                        border-opacity-50 flex h-12 justify-between px-2 transition-all duration-300
                    "
        >
            <div className="flex gap-2 justify-center items-center ml-2">
                <p className="align-middle font-bold text-xl text-white">{board.name}</p>
            </div>
            <div className="flex gap-2 justify-center items-center">
                <input className="bg-gray-100 py-1 rounded px-2" placeholder="Type to search..."></input>
                <button className="p-1 rounded cursor-pointer hover:bg-zinc-600 hover:bg-opacity-35">
                    <MagnifyingGlassIcon className="size-6 text-white" />
                </button>
                <button
                    className="p-1 hover:bg-zinc-600 hover:bg-opacity-35 rounded"
                    onClick={showSideBar}
                >
                    <EllipsisHorizontalIcon className="size-6 text-white" />
                </button>
            </div>
        </div>
    );
}

export default KanbanBoardTitle;