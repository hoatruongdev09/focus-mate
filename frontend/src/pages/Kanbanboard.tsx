import { useDispatch, useSelector } from "react-redux"
import KanbanBoard from "../components/board/kanban-board"
import KanbanBoardTitle from "../components/board/kanban-board-title"
import LeftSideBar from "../components/left-side-bar"
import { useGetBoardQuery, useGetListsQuery, useGetCardsQuery } from "../store/services/board-service"
import { useCallback, useEffect, useState } from "react"
import { setBoard, setColumns, setTasks } from "../store/slices/board-slice"
import { hideLoadingScreen, showLoadingScreen } from "../store/slices/app-slice"
import { Navigate, useLocation, useParams } from "react-router-dom"
import RightSideBar from "../components/right-side-bar/right-side-bar"
import { AppRootState } from "../store/store"


const KanbanBoardPage = () => {
    const { board_id } = useParams()
    const dispatch = useDispatch()
    const [showRightBar, setShowRightBar] = useState(false)
    const location = useLocation()

    if (!board_id) {
        return <Navigate to={'/'} state={{ from: location }} />
    }
    const selectedBoard = useSelector((state: AppRootState) => state.boardView.board)
    const { data: board, isLoading: isLoadingBoard } = useGetBoardQuery(+board_id)
    const { data: columns, isLoading: isLoadingColumns } = useGetListsQuery(+board_id)
    const { data: tasks, isLoading: isLoadingTasks } = useGetCardsQuery(+board_id)

    useEffect(() => {
        if (columns?.length) {
            dispatch(setColumns([...columns].reverse()))
        }
        else {
            dispatch(setColumns([]))
        }
    }, [columns])

    useEffect(() => {
        if (tasks?.length) {
            dispatch(setTasks(tasks.map(t => ({
                task: t,
                nextTimeUpdate: Date.now()
            }))))
        }
        else {
            dispatch(setTasks([]))
        }
    }, [tasks])

    useEffect(() => {
        if (board) {
            dispatch(setBoard(board))
        }
    }, [board])

    useEffect(() => {
        if (isLoadingColumns && isLoadingTasks && isLoadingBoard) {
            dispatch(showLoadingScreen())
        } else {
            dispatch(hideLoadingScreen())
        }
    }, [isLoadingColumns, isLoadingTasks, isLoadingBoard])


    if (isLoadingColumns || isLoadingTasks || !selectedBoard) {
        return (<></>)
    }

    const handleHideRightBar = () => {
        setShowRightBar(false)
    }

    const handleShowRightBar = () => {
        setShowRightBar(true)
    }

    const bgStyle: React.CSSProperties | undefined = selectedBoard.theme ? { background: selectedBoard.theme.bg_value } : undefined

    return (
        <>
            <div
                style={bgStyle}
                className="fixed left-0 right-0 top-10 bottom-0 flex items-stretch transition-all duration-300"
            >
                <LeftSideBar board={selectedBoard} />
                <div className="flex flex-col flex-1">
                    <KanbanBoardTitle
                        board={selectedBoard}
                        showSideBar={handleShowRightBar}
                    />
                    <div className="flex-1 relative">
                        <div className="absolute left-0 right-0 top-0 bottom-0">
                            <KanbanBoard />
                        </div>
                    </div>
                </div>
                <RightSideBar
                    isShow={showRightBar}
                    hide={handleHideRightBar}
                />
            </div>
        </>
    )
}

export default KanbanBoardPage