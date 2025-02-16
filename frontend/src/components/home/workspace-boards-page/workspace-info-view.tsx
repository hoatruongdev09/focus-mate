import { PencilIcon, LockClosedIcon } from "@heroicons/react/24/outline"
import { Workspace } from "../../../types/workspace.type"
import { useContext } from "react"
import { HomeWorkspaceContext } from "../../../pages/home-workspace-boards-page"

function WorkspaceInfoView({ workspace }: { workspace: Workspace | null | undefined }) {
    const homeWorkspaceContext = useContext(HomeWorkspaceContext)

    return (
        <div className="flex items-center gap-5 px-4">
            <div className="size-14 bg-red-700 rounded items-center justify-center flex">
                <p className="text-white font-bold text-4xl">M</p>
            </div>
            <div className="flex flex-col gap-0.5">
                <div className="flex gap-2 items-center">
                    <p className="text-lg font-bold leading-none">{workspace?.name}  </p>
                    <button
                        className="hover:bg-zinc-300 p-1 rounded"
                        onClick={() => homeWorkspaceContext.handleSetEditInfo(true)}
                    >
                        <PencilIcon className="size-4" />
                    </button>
                </div>
                <div className="flex gap-2 items-center">
                    <LockClosedIcon className="size-3" />
                    <p className="text-sm text-zinc-700">Private</p>
                </div>
            </div>
        </div>
    )
}

export default WorkspaceInfoView