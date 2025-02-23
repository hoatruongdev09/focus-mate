import { NavLink } from "react-router-dom"
import MagnifyingGlassIcon from "@heroicons/react/24/outline/MagnifyingGlassIcon"
import BoardLinkItem from "../components/workspace-boards/board-link-item"
import { useDispatch, useSelector } from "react-redux"
import { showCreateBoardModal } from "../store/slices/app-slice"
import { AppRootState } from "../store/store"
import WorkspaceHeaderView from "../components/workspace/workspace-header-view"

const WorkspaceBoardsPage = () => {
    const dispatch = useDispatch()
    const workspace = useSelector((state: AppRootState) => state.workspaceView.currentWorkspace)

    const boards = useSelector((state: AppRootState) => state.workspaceView.currentWorkspaceBoards)

    if (!workspace) {
        return null
    }

    const onAddNewWorkspace = () => {
        if (!workspace) { return }
        dispatch(showCreateBoardModal())
    }

    return (
        <div className="flex flex-col flex-1 items-center">
            <div className="flex flex-col items-center w-full xl:w-[90%]">

                <div className="flex items-stretch flex-col mt-10 w-[60%]">
                    <WorkspaceHeaderView workspace={workspace} />
                </div>

                <div className="w-full flex px-12">
                    <div className="w-full h-px bg-zinc-400 mt-10" />
                </div>

                <div className="w-full flex flex-col gap-6 mt-8 px-10">
                    <p className="font-bold text-zinc-800 text-2xl">Boards</p>
                    <div className="flex flex-col w-full lg:flex-row gap-2 items-center justify-between">
                        <div className="flex items-center gap-1 w-full lg:w-auto">
                            <div className="flex flex-col gap-1 flex-1 lg:flex-none">
                                <p className="text-zinc-700 font-semibold text-sm">Sort by</p>
                                <input
                                    type="text"
                                    className="border rounded-sm px-2 py-1 lg:w-56"
                                    placeholder="Most recently active"
                                />
                            </div>
                            <div className="flex flex-col gap-1 flex-1 lg:flex-none">
                                <p className="text-zinc-700 font-semibold text-sm">Filter by</p>
                                <input
                                    type="text"
                                    className="border rounded-sm px-2 py-1 lg:w-56"
                                    placeholder="Most recently active"
                                />
                            </div>
                        </div>
                        <div className="flex w-full lg:w-auto flex-col gap-1">
                            <p className="text-zinc-700 font-semibold text-sm">Search</p>
                            <div className="flex items-center gap-2 border rounded-sm px-2 py-1">
                                <MagnifyingGlassIcon className="size-4" />
                                <input
                                    type="text"
                                    placeholder="Search boards"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap items-center w-full gap-2 mt-6 px-10">
                    {
                        boards.map(b => (
                            <NavLink
                                to={`/w/${workspace.short_name}/${b.name}`}
                                key={`board-link-${b.name}`}
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
        </div>
    )
}

export default WorkspaceBoardsPage