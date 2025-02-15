import { Navigate, NavLink, useParams } from "react-router-dom"
import { useGetWorkspaceBoardsByShortNameQuery } from "../store/services/board-service"
import { useGetWorkspaceByShortNameQuery } from "../store/services/workspace-service"
import { UserIcon } from "@heroicons/react/24/outline"
import BoardLinkItem from "../components/workspace-boards/board-link-item"
import { useDispatch } from "react-redux"
import { setCurrentWorkspace } from "../store/slices/workspace-slice"
import { createContext, useState } from "react"
import WorkspaceInfoView from "../components/home/workspace-boards-page/workspace-info-view"
import WorkspaceInfoEditForm from "../components/home/workspace-boards-page/workspace-info-edit-form"
import { setShowCreateBoardModal } from "../store/slices/app-slice"

export const HomeWorkspaceContext = createContext({
    isEditInfo: false,
    handleSetEditInfo: (value: boolean) => { }
})

const HomeWorkspaceBoardsPage = () => {
    const { workspace_short_name } = useParams()
    const dispatch = useDispatch()
    const [isEditInfo, setIsEditInfo] = useState(false)



    if (!workspace_short_name) {
        return (<Navigate to='/' state={{ from: location }} />)
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
        error: loadBoardsError
    } = useGetWorkspaceBoardsByShortNameQuery(workspace_short_name)

    const onAddNewWorkspace = () => {
        if (!workspace) { return }
        dispatch(setCurrentWorkspace(workspace))
        dispatch(setShowCreateBoardModal(true))
    }

    const handleSetEditInfo = (value: boolean) => {
        setIsEditInfo(value)
    }


    if (isLoadingWorkspace && isLoadingBoards) {
        return (<>Loading</>)
    }

    if (isLoadWorkspaceError || isLoadBoardsError) {
        return (<>{JSON.stringify(loadWorkspaceError || loadBoardsError)}</>)
    }



    return (
        <>
            <div className="flex-1 py-10 pr-10 xl:flex-none xl:w-[50%] xl:pr-0">

                <HomeWorkspaceContext.Provider value={{ isEditInfo, handleSetEditInfo }}>
                    {
                        isEditInfo ?
                            <WorkspaceInfoEditForm workspace={workspace} /> :
                            <WorkspaceInfoView workspace={workspace} />
                    }
                </HomeWorkspaceContext.Provider>

                <div className="h-px bg-zinc-600 rounded mt-10" />

                <div className="flex mt-3 px-4 items-center gap-2">
                    <UserIcon className="size-5" />
                    <p className="text-lg font-bold leading-none">Your boards</p>
                </div>
                <div className="flex flex-wrap items-center gap-2 mt-4 px-4">
                    {

                        boards && boards.map(b => (
                            <NavLink
                                to={`/w/${workspace?.short_name}/${b.id}`}
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

