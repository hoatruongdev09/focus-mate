import { Bars3BottomLeftIcon } from "@heroicons/react/16/solid"
import { setViewingTask } from "../../../store/slices/board-slice"
import { useDispatch } from "react-redux"
import { Task } from "../../../types/board-type"
import { useUpdateTaskMutation } from "../../../store/services/board-service"
import { useState } from "react"
import DescriptionTextEditor from "./description-editor/description-texteditor"

const TaskDescription = ({ task }: { task: Task }) => {

    const dispatch = useDispatch()
    const [updateTask] = useUpdateTaskMutation()
    const [wasEditDescription, setWasEditDescription] = useState(false)


    const onDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setWasEditDescription(true)
        dispatch(setViewingTask({
            ...task,
            description: e.target.value
        }))
    }

    const onOutOfFocusDescription = () => {
        if (!wasEditDescription) { return }
        setWasEditDescription(false)
        updateTask({
            ...task
        })
    }

    return (
        <div className="flex gap-2">
            <div className="h-10 w-10 flex items-center justify-center">
                <Bars3BottomLeftIcon className="size-6" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold text-lg">Description</p>
                {/* <textarea
                    className="bg-slate-300 bg-opacity-25 min-h-16 max-h-72 rounded p-2 resize-none"
                    placeholder="Add a more detailed description..."
                    value={task.description}
                    onChange={onDescriptionChange}
                    onBlur={onOutOfFocusDescription}
                >

                </textarea> */}
                <DescriptionTextEditor />
            </div>
        </div>
    )
}

export default TaskDescription