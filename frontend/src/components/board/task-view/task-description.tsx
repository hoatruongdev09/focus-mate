import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid"
import { setViewingTask } from "../../../store/slices/board-slice"
import { useDispatch, useSelector } from "react-redux"
import { Card } from "../../../types/board.type"
import { useUpdateCardMutation } from "../../../store/services/board-service"
import { useCallback, useState } from "react"
import TextEditor from "../../text-editor/components/text-editor"
import { XMarkIcon } from "@heroicons/react/16/solid";
import { AppRootState } from "../../../store/store"

const TaskDescription = ({ task }: { task: Card }) => {

    const dispatch = useDispatch()
    const [updateTask] = useUpdateCardMutation()
    const board = useSelector((state: AppRootState) => state.boardView.board)
    const [content, setContent] = useState(task.description)
    const [onFocus, setOnFocus] = useState(false)

    const handleFocus = useCallback(() => {
        setOnFocus(true)
    }, [setOnFocus])

    const handleChange = useCallback((value: string) => {
        setContent(value)
    }, [setContent, task, dispatch])

    const handleSave = useCallback(async () => {
        if (!board) { return }
        dispatch(setViewingTask({
            ...task,
            description: content
        }))
        await updateTask({
            ...task,
            board_id: board.id,
            description: content
        })
        setOnFocus(false)
    }, [content, updateTask, task, setOnFocus, board])

    const handleSetOnFocus = useCallback((focus: boolean) => {
        setOnFocus(focus)
    }, [setOnFocus])

    const handleBlur = useCallback(() => {
        setOnFocus(false)
    }, [setOnFocus])

    return (
        <div className="flex gap-2">
            <div className="h-10 w-10 flex items-center justify-center">
                <Bars3BottomLeftIcon className="size-6" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold text-lg">Description</p>
                <TextEditor
                    value={content}
                    isActive={onFocus}
                    setIsActive={handleSetOnFocus}
                    onBlur={handleFocus}
                    onChange={handleChange}
                    placeHolder="Add a more detailed description"
                />
                {
                    onFocus ? <div className="flex items-center gap-2 pt-2">
                        <button
                            className="bg-blue-600 text-white px-3 rounded py-1 hover:bg-blue-500"
                            onClick={handleSave}
                        >
                            Save
                        </button>
                        <button
                            className="p-1 hover:bg-gray-200 rounded"
                            onClick={handleBlur}
                        >
                            <XMarkIcon className="size-6" />
                        </button>
                    </div> : <></>
                }
            </div>
        </div>
    )
}

export default TaskDescription