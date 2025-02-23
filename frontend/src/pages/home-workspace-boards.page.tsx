import { NavLink, useParams } from "react-router-dom"
import { UserIcon } from "@heroicons/react/24/outline"
import BoardLinkItem from "../components/workspace-boards/board-link-item"
import WorkspaceHeaderView from "../components/workspace/workspace-header-view"
import { useGetWorkspaceByShortNameQuery } from "../store/services/workspace-service"
import { useGetWorkspaceBoardsByShortNameQuery } from "../store/services/board-service"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import { showCreateBoardModal } from "../store/slices/app-slice"
import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../store/store"
import { WorkspaceRole } from "../types/workspace.type"


const HomeWorkspaceBoardsPage = () => {
    const { workspace_short_name } = useParams()
    const dispatch = useDispatch()
    const user = useSelector((state: AppRootState) => state.user.data)
    if (!workspace_short_name) {
        return <>Not found</>
    }
    const {
        data: workspace,
        isLoading: isLoadingWorkspace,
        isError: isLoadWorkspaceError,
        error: loadWorkspaceError
    } = useGetWorkspaceByShortNameQuery(workspace_short_name)
    const {
        data: boards,
        isLoading: isLoadingBoards,
        isError: isLoadBoardsError,
        error: loadBoadsError
    } = useGetWorkspaceBoardsByShortNameQuery(workspace_short_name)



    if (isLoadingWorkspace || isLoadingBoards) {
        return <>Loading</>
    }
    if (isLoadWorkspaceError || isLoadBoardsError) {
        const error = (loadWorkspaceError || loadBoadsError) as FetchBaseQueryError
        return <>{JSON.stringify(error)}</>
    }

    const onAddNewWorkspace = () => {
        dispatch(showCreateBoardModal())
    }

    const yourMemberData = workspace?.data.members.find(m => m.user_id == user?.id)

    return (
        <>
            <div className="flex-1 py-10 pr-10 xl:flex-none xl:w-[50%] xl:pr-0 overflow-y-scroll">
                <WorkspaceHeaderView workspace={workspace!.data} />

                <div className="h-px bg-zinc-600 rounded mt-10" />

                <div className="flex mt-3 px-4 items-center gap-2">
                    <UserIcon className="size-5" />
                    <p className="text-lg font-bold leading-none">Your boards</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4 px-4">
                    {

                        boards?.data.map(b => (
                            <NavLink
                                to={`/w/${workspace?.data.short_name}/${b.name}`}
                                key={`board-link-${b.name}`}
                            >
                                <BoardLinkItem board={b} />
                            </NavLink>
                        ))

                    }
                    {
                        (yourMemberData && (yourMemberData.role == WorkspaceRole.Owner || yourMemberData.role == WorkspaceRole.Admin)) && <button
                            onClick={onAddNewWorkspace}
                            className="relative h-24 w-48 bg-rose-300 bg-opacity-65 rounded hover:bg-opacity-100 flex flex-col items-center justify-center"
                        >
                            <p className="">Create new board</p>
                        </button>
                    }
                </div>
            </div>
        </>
    )




}

export default HomeWorkspaceBoardsPage

