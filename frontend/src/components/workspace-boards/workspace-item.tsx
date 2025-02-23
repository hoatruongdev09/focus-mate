import { Link } from "react-router-dom"
import { useGetWorkspaceBoardsQuery } from "../../store/services/board-service"
import { Workspace, WorkspaceRole } from "../../types/workspace.type"
import { setCurrentWorkspace } from "../../store/slices/workspace-slice"
import BoardLinkItem from "./board-link-item"
import { useDispatch, useSelector } from "react-redux"
import { showCreateBoardModal } from "../../store/slices/app-slice"
import { AppRootState } from "../../store/store"

interface Props {
    workspace: Workspace
}

const WorkspaceItem = (props: Props) => {
    const dispatch = useDispatch()
    const { workspace } = props
    const { data, isLoading } = useGetWorkspaceBoardsQuery(workspace.id)
    const user = useSelector((state: AppRootState) => state.user.data)

    if (isLoading) {
        return <>Loading</>
    }

    const onAddNewWorkspace = () => {
        dispatch(setCurrentWorkspace(workspace))
        dispatch(showCreateBoardModal())
    }
    const yourMemberData = workspace?.members.find(m => m.user_id == user?.id)


    return (
        <div className="flex flex-col gap-3">
            {/* header */}
            <div className="flex justify-between">
                <div className="flex items-center gap-2">
                    <div className="size-6 rounded bg-red-700 flex items-center justify-center">
                        <p className="font-bold text-white text-sm">W</p>
                    </div>
                    <p className="font-semibold">{workspace.name}</p>
                </div>
                <div className="flex gap-2">
                    <button className="bg-zinc-200 rounded px-2 py-1">Boards</button>
                    <button className="bg-zinc-200 rounded px-2 py-1">Views</button>
                    <button className="bg-zinc-200 rounded px-2 py-1">Members</button>
                    <button className="bg-zinc-200 rounded px-2 py-1">Settings</button>
                </div>
            </div>

            {/* boards */}
            <div className="flex gap-2 flex-wrap items-center ">
                {
                    data && data.data.map(b => (
                        <Link
                            to={`/w/${workspace.short_name}/${b.name}`}
                            key={`board-link-${b.name}`}
                        >
                            <BoardLinkItem board={b} />
                        </Link>
                    ))
                }
                {
                    (yourMemberData && (yourMemberData.role == WorkspaceRole.Admin || yourMemberData.role == WorkspaceRole.Owner)) && <button
                        onClick={onAddNewWorkspace}
                        className="relative h-24 w-48 bg-rose-300 bg-opacity-65 rounded hover:bg-opacity-100 flex flex-col items-center justify-center"
                    >
                        <p className="">Create new board</p>
                    </button>
                }
            </div>
        </div>
    )
}

export default WorkspaceItem