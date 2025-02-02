import { PhotoIcon, TagIcon, UserPlusIcon, UsersIcon } from "@heroicons/react/24/outline";
import CoverChangeDialog from "./cover-change-dialog";
import { useCallback, useState } from "react";

const TaskFunctions = () => {
    const [showCoverDialog, setShowCoverDialog] = useState(false)
    const handleHideCoverDialog = useCallback(() => {
        setShowCoverDialog(false)
    }, [setShowCoverDialog])
    const handleShowCoverDialog = useCallback(() => {
        setShowCoverDialog(true)
    }, [setShowCoverDialog])
    return (

        <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 bg-gray-200 bg-opacity-25 px-2 py-1 rounded hover:bg-gray-300">
                    <UserPlusIcon className="size-4" />
                    <p>Join</p>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 bg-opacity-25 px-2 py-1 rounded hover:bg-gray-300">
                    <UsersIcon className="size-4" />
                    <p>Members</p>
                </button>
                <button className="flex items-center gap-2 bg-gray-200 bg-opacity-25 px-2 py-1 rounded hover:bg-gray-300">
                    <TagIcon className="size-4" />
                    <p>Labels</p>
                </button>
                <div className="w-full relative flex">
                    <button
                        className="flex flex-1 items-center gap-2 bg-gray-200 bg-opacity-25 px-2 py-1 rounded hover:bg-gray-300"
                        onClick={handleShowCoverDialog}
                    >
                        <PhotoIcon className="size-4" />
                        <p>Cover</p>

                    </button>
                    <CoverChangeDialog isActive={showCoverDialog} hide={handleHideCoverDialog} />
                </div>
            </div>
        </div>
    )
}
export default TaskFunctions