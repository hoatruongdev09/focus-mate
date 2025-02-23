import { Navigate, Outlet, useLocation, useParams } from "react-router-dom"
import NavBar from "../components/nav-bar"
import LeftSideBar from "../components/left-side-bar"
import { createContext, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux"
import { AppRootState } from "../store/store"
import { useGetWorkspaceByShortNameQuery } from "../store/services/workspace-service"
import { setCurrentWorkspace, setCurrentWorkspaceBoards } from "../store/slices/workspace-slice"
import { FetchBaseQueryError } from "@reduxjs/toolkit/query"
import UnauthorizedError from "../pages/unauthorized.page"
import { useGetWorkspaceBoardsByShortNameQuery } from "../store/services/board-service"
import RightSideBar from "../components/right-side-bar/right-side-bar"

export const WorkspaceBoardContext = createContext({
    showRightBar: false,
    handleSetShowRightBar: (value: boolean) => { }
})

const WorkspaceLayout = () => {
    const location = useLocation()
    const dispatch = useDispatch()
    const { workspace_short_name } = useParams()
    const [showRightBar, setShowRightBar] = useState(false)
    const selectedBoard = useSelector((state: AppRootState) => state.boardView.board)
    const currentWorkspace = useSelector((state: AppRootState) => state.workspaceView.currentWorkspace)

    if (!workspace_short_name) {
        return (<Navigate to={'/'} state={{ from: location }} />)
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

    useEffect(() => {
        if (!workspace) { return }
        dispatch(setCurrentWorkspace(workspace.data))
    }, [dispatch, workspace])

    useEffect(() => {
        if (!boards) { return }
        dispatch(setCurrentWorkspaceBoards(boards.data))
    }, [dispatch, boards])

    if (isLoadingWorkspace || isLoadingBoards) {
        return <>Loading</>
    }
    let loadingError = undefined

    if (isLoadWorkspaceError || isLoadBoardsError) {
        loadingError = (loadWorkspaceError as FetchBaseQueryError) || (loadBoadsError as FetchBaseQueryError)
        if (loadingError.status != 403) {
            return <div className="pt-50">TODO</div>
        } else {
            return <UnauthorizedError />
        }
    }

    const handleSetShowRightBar = (value: boolean) => {
        setShowRightBar(value)
    }

    const bgStyle: React.CSSProperties | undefined = selectedBoard && selectedBoard.theme ?
        { background: selectedBoard.theme.bg_value } :
        undefined

    if (!currentWorkspace) { return null }
    return (
        <WorkspaceBoardContext.Provider value={{ showRightBar, handleSetShowRightBar }}>
            <div
                style={bgStyle}
                className="fixed left-0 right-0 top-10 bottom-0 flex items-stretch transition-all duration-300"
            >
                {
                    (workspace && boards) &&
                    <LeftSideBar
                        workspace={workspace.data}
                        boards={boards.data}
                    />
                }
                <Outlet />
                <RightSideBar />
            </div>

        </WorkspaceBoardContext.Provider>
    )

}

export default WorkspaceLayout