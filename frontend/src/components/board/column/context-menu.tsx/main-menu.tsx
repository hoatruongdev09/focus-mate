import { XMarkIcon } from "@heroicons/react/24/solid";
import { memo } from "react";

interface Props {
    handleShowCreateTask: () => void
    handleArchiveList: () => void
    handleArchiveTasksInList: () => void
    handleShowContext: () => void
}

const MainMenuList = memo((props: Props) => {
    const { handleShowCreateTask,
        handleArchiveList,
        handleArchiveTasksInList,
        handleShowContext
    } = props
    return (
        <>
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
        </>
    )
})

export default MainMenuList