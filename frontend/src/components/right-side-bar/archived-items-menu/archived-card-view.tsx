import { useDispatch, useSelector } from "react-redux"
import { useArchiveOrUnarchiveCardMutation, useDeleteCardMutation } from "../../../store/services/board-service"
import { Card } from "../../../types/board.type"
import ArchivedCard from "./archived-card"
import { AppRootState } from "../../../store/store"
import { useCallback } from "react"
import { setViewingTask } from "../../../store/slices/board-slice"

interface Props {
    isShow: boolean
    tasks: Card[] | undefined
}

const ArchivedCardsView = (props: Props) => {
    const { isShow, tasks } = props
    const dispatch = useDispatch()

    const [archiveOrUnarchiveTask] = useArchiveOrUnarchiveCardMutation()
    const [deleteTask] = useDeleteCardMutation()

    const { board, viewingTask } = useSelector((state: AppRootState) => state.boardView)

    const handleRestoreTask = useCallback(async (task: Card) => {
        if (!board) { return }
        const isViewingThisTask = task.id === viewingTask?.id
        if (isViewingThisTask) {
            dispatch(setViewingTask({
                ...task,
                archived: !task.archived
            }))
        }
        const { data: newTask } = await archiveOrUnarchiveTask({ board_id: board.id, list_id: task.list_id, card_id: task.id })
        if (isViewingThisTask && newTask) {
            dispatch(setViewingTask(newTask))
        }
    }, [board, viewingTask, archiveOrUnarchiveTask])

    const handleDeleteTask = useCallback(async (task: Card) => {
        if (!board) { return }
        const isViewingThisTask = task.id === viewingTask?.id
        if (isViewingThisTask) {
            dispatch(setViewingTask(null))
        }
        deleteTask({ card_id: task.id, board_id: board.id })
    }, [board, viewingTask, deleteTask])

    return (
        <div
            className={`absolute inset-0 overflow-y-scroll flex flex-col items-center mt-2 gap-2 ${isShow ? 'opacity-100 z-10' : 'opacity-0 z-0'} transition-opacity duration-100`}
        >
            {
                tasks && tasks.map(t => (
                    <ArchivedCard
                        key={`archived-card-${t.id}`}
                        task={t}
                        onDelete={handleDeleteTask}
                        onRestore={handleRestoreTask}
                    />
                ))
            }

        </div>
    )
}

export default ArchivedCardsView