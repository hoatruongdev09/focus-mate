import { Navigate, NavLink, useParams } from "react-router-dom"
import { useGetWorkspaceBoardsQuery } from "../store/services/board-service"
import { useGetWorkspaceQuery } from "../store/services/workspace-service"
import { PencilIcon, UserIcon } from "@heroicons/react/24/outline"
import { LockClosedIcon } from "@heroicons/react/24/outline"
import BoardLinkItem from "../components/workspace-boards/board-link-item"
import { useDispatch } from "react-redux"
import { setCurrentWorkspace } from "../store/slices/workspace-slice"
import { useContext, useEffect, useState } from "react"
import { HomeContext } from "../layouts/home-layout"
import { Workspace } from "../types/workspace"

const HomeWorkspaceBoardsPage = () => {
    const { workspace_id } = useParams()
    const dispatch = useDispatch()
    const { handleShowCreateBoard } = useContext(HomeContext)
    const [selectingWorkspace, setSelectingWorkspace] = useState<Workspace | null>(null)

    if (!workspace_id) {
        return (<Navigate to='/' state={{ from: location }} />)
    }

    const {
        data: workspace,
        isLoading: isLoadingWorkspace,
        isError: isLoadWorkspaceError,
        error: loadWorkspaceError
    } = useGetWorkspaceQuery(+workspace_id)

    const {
        data: boards,
        isLoading: isLoadingBoards,
        isError: isLoadBoardsError,
        error: loadBoardsError
    } = useGetWorkspaceBoardsQuery(+workspace_id)

    const onAddNewWorkspace = () => {
        console.log("current workspace: ", selectingWorkspace)
        dispatch(setCurrentWorkspace(selectingWorkspace))
        handleShowCreateBoard()
    }

    useEffect(() => {
        if (!workspace) { return }
        setSelectingWorkspace(workspace)
    }, [workspace])

    if (isLoadingWorkspace && isLoadingBoards) {
        return (<>Loading</>)
    }

    if (isLoadWorkspaceError || isLoadBoardsError) {
        return (<>{JSON.stringify(loadWorkspaceError || loadBoardsError)}</>)
    }

    return (
        <>
            <div className="flex-1 py-10 pr-10 xl:flex-none xl:w-[50%] xl:pr-0">
                <div className="flex items-center gap-5 px-4">
                    <div className="size-14 bg-red-700 rounded items-center justify-center flex">
                        <p className="text-white font-bold text-4xl">M</p>
                    </div>
                    <div className="flex flex-col gap-0.5">
                        <div className="flex gap-2 items-center">
                            <p className="text-lg font-bold leading-none">{workspace?.name}  </p>
                            <button className="hover:bg-zinc-300 p-1 rounded">
                                <PencilIcon className="size-4" />
                            </button>
                        </div>
                        <div className="flex gap-2 items-center">
                            <LockClosedIcon className="size-3" />
                            <p className="text-sm text-zinc-700">Private</p>
                        </div>
                    </div>
                </div>

                <div className="h-px bg-zinc-600 rounded mt-10" />

                <div className="flex mt-3 px-4 items-center gap-2">
                    <UserIcon className="size-5" />
                    <p className="text-lg font-bold leading-none">Your boards</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4 px-4 justify-stretch">
                    {

                        boards && boards.map(b => (
                            <NavLink
                                to={`/workspace/board/${b.id}`}
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
        </>
    )
}

export default HomeWorkspaceBoardsPage