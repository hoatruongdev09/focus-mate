import { EyeIcon } from "@heroicons/react/24/outline"
import { Task } from "../../../types/board-type"

interface Props {
    task: Task
    onDelete?: (task: Task) => void | undefined
    onRestore?: (task: Task) => void | undefined

}

const ArchivedCard = (props: Props) => {
    const { task, onDelete, onRestore } = props
    return (
        <div className="flex w-72 flex-col">
            <div className="h-8 rounded-t-lg bg-blue-500 border-t border-l border-r"></div>
            <div className="flex flex-col gap-2 p-2 bg-white rounded-b-lg border-b border-l border-r">

                <p>{task.title}</p>
                <div className="flex gap-2">
                    <EyeIcon className="size-3" />

                </div>
            </div>
        </div>
    )
}

export default ArchivedCard