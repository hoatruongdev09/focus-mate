import { EllipsisHorizontalIcon, XMarkIcon } from "@heroicons/react/24/solid";
import { useCallback, useRef, useState } from "react";
import useClickOutside from "../../../custom-hooks/use-click-outside";

interface Props {
    setShowCreateTask: () => void
    archiveList: () => void
    archiveTasksInList: () => void
}

function ColumnContextMenu(props: Props) {
    const { setShowCreateTask, archiveList, archiveTasksInList } = props
    const [showContextMenu, setShowContextMenu] = useState(false)

    const ref = useRef<HTMLDivElement>(null)

    const handleShowContext = useCallback(() => {
        setShowContextMenu(!showContextMenu)
    }, [showContextMenu, setShowContextMenu])

    const clickOutsideRef = useClickOutside(() => {
        setShowContextMenu(false)
    }, [], [showContextMenu, setShowContextMenu])

    const handleShowCreateTask = useCallback(() => {
        setShowCreateTask()
        setShowContextMenu(false)
    }, [setShowCreateTask, setShowContextMenu])

    const handleArchiveList = useCallback(() => {
        archiveList()
        setShowContextMenu(false)
    }, [archiveList, setShowContextMenu])

    const handleArchiveTasksInList = useCallback(() => {
        archiveTasksInList()
        setShowContextMenu(false)
    }, [archiveTasksInList, setShowContextMenu])

    return (
        <div className="relative" ref={clickOutsideRef}>
            <button
                className={`p-1 rounded ${showContextMenu ? "bg-gray-600 text-white hover:bg-gray-500" : "hover:bg-gray-200"}`}
                onClick={handleShowContext}
            >
                <EllipsisHorizontalIcon className="size-4" />
            </button>
            <div
                ref={ref}
                className="absolute z-10 left-0"
            >
                {
                    showContextMenu && <div className="flex flex-col w-64 bg-white shadow-lg border rounded-xl pb-3">
                        <div className="flex justify-between items-center px-2 h-10 relative">
                            <p className="flex-1 text-center font-semibold text-sm text-gray-800">List action</p>
                            <button
                                className="absolute p-1 right-2  rounded hover:bg-gray-200"
                                onClick={handleShowContext}
                            >
                                <XMarkIcon className="size-4" />
                            </button>
                        </div>
                        <div className="flex flex-col">
                            <button
                                className="hover:bg-red-100 py-1 px-3 text-sm text-left"
                                onClick={handleShowCreateTask}
                            >
                                Add card
                            </button>
                            <button className="hover:bg-red-100 py-1 px-3 text-sm text-left">
                                Move list
                            </button>
                            <div className="px-3 py-1">
                                <div className="bg-slate-300 h-px "></div>
                            </div>
                            <button
                                className="hover:bg-red-100 py-1 px-3 text-sm text-left"
                                onClick={handleArchiveList}
                            >
                                Archive this list
                            </button>
                            <button
                                className="hover:bg-red-100 py-1 px-3 text-sm text-left"
                                onClick={handleArchiveTasksInList}
                            >
                                Archive all cards in this list
                            </button>
                        </div>
                    </div>
                }
            </div>
        </div>
    );
}

export default ColumnContextMenu;