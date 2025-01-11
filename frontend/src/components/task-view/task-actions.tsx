import { XMarkIcon } from "@heroicons/react/16/solid"
import ColumnMoveDialog from "./column-move-dialog"
import { useState } from "react"
import ArchiveBoxXMarkIcon from "@heroicons/react/24/outline/ArchiveBoxXMarkIcon"
import { Task } from "../../types/board-type"
import { useArchiveOrUnarchiveTaskMutation, useDeleteTaskMutation } from "../../store/services/board-service"
import { useDispatch } from "react-redux"
import { setViewingTask } from "../../store/slices/board-slice"
import { ArrowLongLeftIcon, MinusIcon } from "@heroicons/react/24/solid"


const TaskActions = ({ task }: { task: Task }) => {
    const dispatch = useDispatch()

    const [showChangeColumn, setShowChangeColumn] = useState(false)
    const [archiveOrUnarchiveTask] = useArchiveOrUnarchiveTaskMutation()
    const [deleteTask] = useDeleteTaskMutation()

    const onArchiveClick = async () => {
        const { data: newTask } = await archiveOrUnarchiveTask(task.id)
        if (newTask) {
            dispatch(setViewingTask({
                ...task,
                archived: !task.archived
            }))
        }
    }
    const onDeleteClick = async () => {
        await deleteTask(task.id)
        dispatch(setViewingTask(null))
    }

    return (<div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Actions</p>
        <div className="flex flex-col gap-2">
            <div className="flex w-full relative">
                <button
                    className="flex flex-1 items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded"
                    onClick={() => setShowChangeColumn(true)}
                >
                    <XMarkIcon className="size-4" />
                    Move
                </button>
                <div className="absolute top-8 right-0">
                    <ColumnMoveDialog
                        isActive={showChangeColumn}
                        hide={() => setShowChangeColumn(false)}
                    />
                </div>
            </div>
            <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                <XMarkIcon className="size-4" />
                Copy
            </button>
            <div className="bg-slate-300 h-px"></div>

            <button
                className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded"
                onClick={onArchiveClick}>
                {
                    task.archived ?
                        <>
                            <ArrowLongLeftIcon className="size-4" />
                            Move to board
                        </>
                        :
                        <>
                            <ArchiveBoxXMarkIcon className="size-4" />
                            Archive
                        </>
                }
            </button>
            {
                task.archived &&
                <>
                    <div className="bg-slate-300 h-px"></div>
                    <button
                        className="flex items-center gap-2 bg-red-300 bg-opacity-25 px-2 py-1 rounded"
                        onClick={onDeleteClick}
                    >
                        <MinusIcon className="size-4" />
                        Delete
                    </button>
                </>
            }

        </div>
    </div>)
}

export default TaskActions