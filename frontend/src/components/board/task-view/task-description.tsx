import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid"
import { setViewingTask } from "../../../store/slices/board-slice"
import { useDispatch } from "react-redux"
import { Task } from "../../../types/board-type"
import { useUpdateTaskMutation } from "../../../store/services/board-service"
import { useCallback, useState } from "react"
import DescriptionTextEditor from "./description-editor/components/text-editor"
import { XMarkIcon } from "@heroicons/react/16/solid";

const TaskDescription = ({ task }: { task: Task }) => {

    const dispatch = useDispatch()
    const [updateTask] = useUpdateTaskMutation()
    const [content, setContent] = useState(task.description)
    const [onFocus, setOnFocus] = useState(false)

    const handleFocus = useCallback(() => {
        setOnFocus(true)
    }, [setOnFocus])

    const handleChange = useCallback((value: string) => {
        setContent(value)
    }, [setContent, task, dispatch])

    const handleSave = useCallback(async () => {
        dispatch(setViewingTask({
            ...task,
            description: content
        }))
        await updateTask({
            ...task,
            description: content
        })
        setOnFocus(false)
    }, [updateTask, task, setOnFocus])

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
                <DescriptionTextEditor
                    value={content}
                    isActive={onFocus}
                    setIsActive={handleSetOnFocus}
                    onFocus={handleFocus}
                    onChange={handleChange}
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