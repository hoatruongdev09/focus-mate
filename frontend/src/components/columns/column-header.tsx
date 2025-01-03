import { useDispatch } from "react-redux"
import { ColumnData, TaskItem } from "../../types/board-type"
import { useState } from "react"
import { setEditingColumn } from "../../store/slices/column-slice"
import { setSelectingColumn } from "../../store/slices/task-view-slice"

const ColumnHeader = ({ column, tasks, scrolled }: { column: ColumnData, tasks: TaskItem[] | undefined, scrolled: boolean }) => {

    const dispatch = useDispatch()
    const [isHoverTitle, setIsHoverTitle] = useState<boolean>(false)

    const onMouseEnter = () => {
        setIsHoverTitle(true)
    }
    const onMouseExit = () => {
        setIsHoverTitle(false)
    }

    const onEdit = () => {
        dispatch(setEditingColumn(column))
    }

    const onOpenCreateTask = (column: ColumnData): void => {
        dispatch(setSelectingColumn(column))
    }
    return (
        <div className={`px-3 flex flex-row justify-between 
            items-center shrink-0 absolute top-0 
            left-0 right-0 z-[31] 
            ${scrolled ? "bg-white" : ""}
            `}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseExit}
        >
            <div className="flex flex-1 gap-2 items-center h-11">
                <p className="text-white bg-pink-700 px-2 rounded-sm">{column.name}</p>
                <p className="text-pink-700">{tasks?.length ?? 0}</p>
            </div>
            <div className={`flex gap-1 transition-opacity duration-300 ${isHoverTitle ? "opacity-100" : "opacity-0"}`}>
                <button
                    className="bg-blue-500 font-bold text-gray-200 px-2 rounded-md h-full text-center"
                    onClick={() => onEdit()}
                >...</button>
                <button
                    className="bg-blue-500 font-bold text-gray-200 px-2 rounded-md h-full text-center"
                    onClick={() => onOpenCreateTask(column)}
                >+</button>
            </div>
        </div>
    )
}

export default ColumnHeader