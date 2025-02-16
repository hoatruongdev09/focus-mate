import ColumnMoveDialog from "./column-move-dialog"
import { useCallback, useState } from "react"
import ArchiveBoxXMarkIcon from "@heroicons/react/24/outline/ArchiveBoxXMarkIcon"
import { Card } from "../../../types/board.type"
import { useArchiveOrUnarchiveCardMutation, useDeleteCardMutation } from "../../../store/services/board-service"
import { useDispatch, useSelector } from "react-redux"
import { setViewingTask } from "../../../store/slices/board-slice"
import { ArrowLongLeftIcon, ArrowLongRightIcon, MinusIcon } from "@heroicons/react/24/solid"
import { DocumentDuplicateIcon } from "@heroicons/react/24/outline"
import { AppRootState } from "../../../store/store"


const TaskActions = ({ task }: { task: Card }) => {
    const dispatch = useDispatch()

    const [showChangeColumn, setShowChangeColumn] = useState(false)
    const [archiveOrUnarchiveTask] = useArchiveOrUnarchiveCardMutation()
    const [deleteTask] = useDeleteCardMutation()
    const board = useSelector((state: AppRootState) => state.boardView.board)

    const handleArchiveClick = useCallback(async () => {
        if (!board) { return }
        const { data: newTask } = await archiveOrUnarchiveTask({ board_id: board.id, list_id: task.list_id, card_id: task.id })
        if (newTask) {
            dispatch(setViewingTask({
                ...task,
                archived: !task.archived
            }))
        }
    }, [archiveOrUnarchiveTask, dispatch, setViewingTask, task, board])

    const handleDeleteClick = useCallback(async () => {
        if (!board) { return }
        await deleteTask({ card_id: task.id, board_id: board.id })
        dispatch(setViewingTask(null))
    }, [deleteTask, dispatch, setViewingTask, board, task])

    return (<div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Actions</p>
        <div className="flex flex-col gap-2">
            <div className="flex w-full relative">
                <button
                    className="flex flex-1 items-center gap-2 bg-gray-200 bg-opacity-25 px-2 py-1 rounded hover:bg-gray-300"
                    onClick={() => setShowChangeColumn(true)}
                >
                    <ArrowLongRightIcon className="size-4" />
                    Move
                </button>
                <div className="absolute top-8 right-0">
                    <ColumnMoveDialog
                        isActive={showChangeColumn}
                        hide={() => setShowChangeColumn(false)}
                    />
                </div>
            </div>
            <button className="flex flex-1 items-center gap-2 bg-gray-200 bg-opacity-25 px-2 py-1 rounded hover:bg-gray-300">
                <DocumentDuplicateIcon className="size-4" />
                Copy
            </button>
            <div className="bg-slate-300 h-px"></div>

            <button
                className="flex flex-1 items-center gap-2 bg-gray-200 bg-opacity-25 px-2 py-1 rounded hover:bg-gray-300"
                onClick={handleArchiveClick}>
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
                        className="flex items-center gap-2 bg-red-300 px-2 py-1 rounded hover:bg-red-200"
                        onClick={handleDeleteClick}
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