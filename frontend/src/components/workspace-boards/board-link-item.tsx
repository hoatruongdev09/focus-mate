import { Board } from "../../types/board-type"

const BoardLinkItem = ({ board }: { board: Board }) => {
    const bgStyle: React.CSSProperties | undefined = board.theme ? { background: board.theme.bg_value } : undefined
    return (
        <div
            style={bgStyle}
            className="h-24 w-48 bg-opacity-65 rounded cursor-pointer hover:bg-opacity-100">
            <p className="p-2 font-bold ">{board.name}</p>
        </div>
    )
}

export default BoardLinkItem