import { Navigate, Outlet, useLocation, useParams } from "react-router-dom"
import { useGetMyInfoQuery } from "../store/services/user-service"
import { useGetWorkspaceByShortNameQuery } from "../store/services/workspace-service"
import { useGetWorkspaceBoardsByShortNameQuery } from "../store/services/board-service"
import NavBar from "../components/nav-bar"
import LeftSideBar from "../components/left-side-bar"
import { createContext, useState } from "react"
import { useSelector } from "react-redux"
import { AppRootState } from "../store/store"

export const WorkspaceBoardContext = createContext({
    showRightBar: false,
    handleSetShowRightBar: (value: boolean) => { }
})

const WorkspaceLayout = () => {
    const location = useLocation()
    const { workspace_short_name } = useParams()
    const [showRightBar, setShowRightBar] = useState(false)
    const selectedBoard = useSelector((state: AppRootState) => state.boardView.board)

    if (!workspace_short_name) {
        return (<Navigate to={'/'} state={{ from: location }} />)
    }

    const {
        data: user,
        isLoading: isLoadingUser,
        isError: isLoadUserError,
        error: loadUserError
    } = useGetMyInfoQuery()

    const {
        data: workspace,
        isLoading: isLoadingWorkspace,
        isError: isLoadingWorkspaceError,
        error: loadWorkspaceError
    } = useGetWorkspaceByShortNameQuery(workspace_short_name)
    const {
        data: boards,
        isLoading: isLoadingBoards,
        isError: isLoadingBoardsError,
        error: loadBoardsError
    } = useGetWorkspaceBoardsByShortNameQuery(workspace_short_name)

    if (isLoadingUser || isLoadingWorkspace || isLoadingBoards) {
        return <>Loading</>
    }
    if (isLoadUserError || isLoadingWorkspaceError || isLoadingBoardsError) {
        return (<Navigate to={'/'} state={{ from: location }} />)
    }

    const handleSetShowRightBar = (value: boolean) => {
        setShowRightBar(value)
    }

    const bgStyle: React.CSSProperties | undefined = selectedBoard && selectedBoard.theme ?
        { background: selectedBoard.theme.bg_value } :
        undefined

    return (
        <WorkspaceBoardContext.Provider value={{ showRightBar, handleSetShowRightBar }}>
            <NavBar />
            <div
                style={bgStyle}
                className="fixed left-0 right-0 top-10 bottom-0 flex items-stretch transition-all duration-300"
            >
                <LeftSideBar
                    workspace={workspace!}
                    boards={boards!}
                />
                <Outlet />
            </div>

        </WorkspaceBoardContext.Provider>
    )

}

export default WorkspaceLayout