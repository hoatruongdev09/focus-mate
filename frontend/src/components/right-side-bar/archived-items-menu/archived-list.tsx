import { ArrowLeftIcon, TrashIcon } from "@heroicons/react/24/outline"
import { List } from "../../../types/board.type"

interface Props {
    group: List
    onDelete?: (group: List) => void
    onRestore?: (group: List) => void
}
const ArchivedList = (props: Props) => {
    const { group, onDelete, onRestore } = props

    const handleSendToBoard = () => {
        onRestore && onRestore(group)
    }

    const handleDelete = () => {
        onDelete && onDelete(group)
    }

    return (
        <div className="flex flex-col w-full">
            <div className="flex flex-wrap justify-between items-center gap-1">
                <p className="text-sm">{group.name} </p>
                <div className="flex flex-1 gap-1 items-center justify-end">
                    <button
                        onClick={handleSendToBoard}
                        className="flex gap-1 items-center font-semibold text-sm px-2 py-1 bg-zinc-100 hover:bg-zinc-200 rounded"
                    >
                        <ArrowLeftIcon className="size-4" />
                        Send to board
                    </button>
                    <button
                        onClick={handleDelete}
                        className="p-1 bg-zinc-100 hover:bg-zinc-200 rounded"
                    >
                        <TrashIcon className="size-4" />
                    </button>
                </div>
            </div>
            <div className="h-px w-full bg-zinc-300 mt-3" />
        </div>
    )
}

export default ArchivedList