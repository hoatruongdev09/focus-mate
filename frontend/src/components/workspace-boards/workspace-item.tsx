import { NavLink } from "react-router-dom"
import { useGetWorkspaceBoardsQuery } from "../../store/services/board-service"
import { Workspace, WorkspaceRole } from "../../types/workspace"
import { WorkspaceContext } from "../../pages/workspace"
import { useContext } from "react"
import { useDispatch, useSelector } from "react-redux"
import { setCurrentWorkspace } from "../../store/slices/workspace-slice"
import { AppRootState } from "../../store/store"
import { Board } from "../../types/board-type"

interface Props {
    workspace: Workspace
}

const WorkspaceItem = (props: Props) => {
    const dispatch = useDispatch()
    const { workspace } = props
    const { data, isLoading } = useGetWorkspaceBoardsQuery(workspace.id)
    const { handleShowCreateBoard } = useContext(WorkspaceContext)

    const { first_name, last_name } = workspace.members.find(m => m.role == WorkspaceRole.Owner)!.user

    const onAddNewWorkspace = () => {
        dispatch(setCurrentWorkspace(workspace))
        handleShowCreateBoard()
    }

    const BoardLinkItem = ({ board }: { board: Board }) => {
        const bgStyle: React.CSSProperties | undefined = board.theme ? { background: board.theme.bg_value } : undefined
        return (
            <div
                style={bgStyle}
                className="h-24 w-48 bg-opacity-65 rounded cursor-pointer hover:bg-opacity-100">
                <p className="p-2 font-bold ">{board.name}</p>
            </div>
        )
    }

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
                    data && data.map(b => (
                        <NavLink
                            to={`/${first_name}_${last_name}/b/${b.id}`}
                            key={`board-link-${b.id}`}
                        >
                            <BoardLinkItem board={b} />
                        </NavLink>
                    ))
                }
                <button
                    onClick={onAddNewWorkspace}
                    className="relative h-24 w-48 bg-rose-300 bg-opacity-65 rounded hover:bg-opacity-100 flex flex-col items-center justify-center"
                >
                    <p className="">Create new board</p>
                </button>
            </div>
        </div>
    )
}

export default WorkspaceItem