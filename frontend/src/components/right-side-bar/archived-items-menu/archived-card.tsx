import { EyeIcon, ArchiveBoxXMarkIcon } from "@heroicons/react/24/outline"
import { CoverType, Task, TaskLayoutType } from "../../../types/board-type"
import { useDispatch } from "react-redux"
import { setViewingTask } from "../../../store/slices/board-slice"

interface Props {
    task: Task
    onDelete?: (task: Task) => void
    onRestore?: (task: Task) => void
}

const ArchivedCard = (props: Props) => {
    const dispatch = useDispatch()
    const { task, onDelete, onRestore } = props
    const { cover_type, layout_type, cover_value } = task

    const handleViewCard = () => {
        dispatch(setViewingTask(task))
    }

    const handleDeleteTask = () => {
        onDelete && onDelete(task)
    }

    const handleRestoreTask = () => {
        onRestore && onRestore(task)
    }

    return (
        <div className="flex w-full flex-col">
            <div
                onClick={handleViewCard}
                className="flex flex-col shadow-md rounded-lg hover:cursor-pointer"
            >
                {

                    (cover_type != CoverType.None && layout_type == TaskLayoutType.Normal) &&
                    <div
                        style={{ background: cover_value }}
                        className="h-8 rounded-t-lg border-t border-l border-r"
                    />
                }
                <div
                    style={{ background: layout_type == TaskLayoutType.Large ? cover_value : "" }}
                    className={`flex flex-col gap-2 p-2 bg-white rounded-b-lg border-b border-l border-r 
                            ${(cover_type == CoverType.None || layout_type == TaskLayoutType.Large) ? "border-t rounded-t-lg" : ""}
                        `}
                >

                    <p className="font-semibold text-zinc-800">{task.title}</p>
                    <div className="flex gap-2 items-center">
                        <div className="p-1">
                            <EyeIcon className="size-3 text-zinc-800" />
                        </div>
                        <div className="p-1 flex items-center gap-2">
                            <ArchiveBoxXMarkIcon className="size-3 text-zinc-800" />
                            <p className="text-sm font-light text-zinc-800">Archived</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="flex mt-1 px-4 gap-2 text-zinc-800">
                <button
                    onClick={handleRestoreTask}
                    className="text-sm font-semibold hover:underline">
                    Send to board
                </button>
                &#8226;
                <button
                    onClick={handleDeleteTask}
                    className="text-sm font-semibold hover:underline">
                    Delete
                </button>
            </div>
        </div>
    )
}

export default ArchivedCard