import { ListBulletIcon } from "@heroicons/react/16/solid"
import TaskComment from "./task-comment"
import TaskCommentInput from "./task-comment-input"
import { Card, CardComment as Comment } from "../../../types/board-type"
import { useSelector } from "react-redux"
import { AppRootState } from "../../../store/store"
import { useGetCardCommentsQuery } from "../../../store/services/board-service"
import { useCallback, useEffect, useState } from "react"

interface Props {
    task: Card
}

const TaskActivity = (props: Props) => {
    const { id, list_id: group_id } = props.task
    const board = useSelector((state: AppRootState) => state.boardView.board)
    if (!board) { return <></> }
    const [taskComments, setTaskComments] = useState<Comment[]>([])
    const {
        data: comments,
        isError: isLoadingCommentsError,
        isSuccess: isLoadingCommentsSuccess
    } = useGetCardCommentsQuery({ board_id: board.id, column_id: group_id, card_id: id })

    useEffect(() => {
        if (isLoadingCommentsSuccess) {
            setTaskComments(comments)
        }
    }, [comments, isLoadingCommentsError, isLoadingCommentsSuccess])

    const handleAddComment = useCallback((comment: Comment) => {
        console.log(`handle add comment: `, comment)
        setTaskComments([
            comment,
            ...taskComments,
        ])
    }, [taskComments, setTaskComments])

    return (
        <div className="flex flex-col pt-2 gap-5">
            <div className="flex flex-col gap-3">
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex flex-1 gap-2 items-center">
                        <div className="h-10 w-10 flex justify-center items-center">
                            <ListBulletIcon className="size-6" />
                        </div>
                        <p className="font-semibold text-lg">Activity</p>
                    </div>
                    <button className="bg-slate-300 bg-opacity-25 py-1 px-2 rounded">
                        <p className="">Hide detail</p>
                    </button>
                </div>

                <TaskCommentInput onAddComment={handleAddComment} />

            </div>

            <div className="flex flex-col gap-3">
                {
                    taskComments?.map(c => (
                        <TaskComment key={`comment-${c.id}`} comment={c} />
                    ))
                }
            </div>
        </div>
    )
}

export default TaskActivity