import { XMarkIcon } from "@heroicons/react/16/solid"
import ColumnMoveDialog from "./column-move-dialog"
import { useState } from "react"


const TaskActions = () => {
    const [showChangeColumn, setShowChangeColumn] = useState(false)

    return (<div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Actions</p>
        <div className="flex flex-col gap-2">
            <div className="flex w-full relative">
                <button
                    className="flex flex-1 items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded"
                    onClick={() => setShowChangeColumn(true)}
                >
                    <XMarkIcon className="size-4" />
                    <p>Move</p>
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
                <p>Copy</p>
            </button>
            <div className="bg-slate-300 h-px"></div>
            <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                <XMarkIcon className="size-4" />
                <p>Archive</p>
            </button>
        </div>
    </div>)
}

export default TaskActions