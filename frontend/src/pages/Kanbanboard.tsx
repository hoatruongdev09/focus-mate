import { useDispatch } from "react-redux"
import KanbanBoard from "../components/board/kanban-board"
import KanbanBoardTitle from "../components/board/kanban-board-title"
import LeftSideBar from "../components/left-side-bar"
import { useGetBoardQuery, useGetColumnsQuery, useGetTasksQuery } from "../store/services/board-service"
import { useEffect } from "react"
import { setBoard, setColumns, setTasks } from "../store/slices/board-slice"
import { hideLoadingScreen, showLoadingScreen } from "../store/slices/app-slice"
import { Navigate, useLocation, useParams } from "react-router-dom"
import RightSideBar from "../components/right-side-bar"


const KanbanBoardPage = () => {
    const { board_id } = useParams()
    const dispatch = useDispatch()

    const location = useLocation()

    if (!board_id) {
        return <Navigate to={'/'} state={{ from: location }} />
    }

    const { data: board, isLoading: isLoadingBoard } = useGetBoardQuery(+board_id)
    const { data: columns, isLoading: isLoadingColumns } = useGetColumnsQuery(+board_id)
    const { data: tasks, isLoading: isLoadingTasks } = useGetTasksQuery(+board_id)

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


    if (isLoadingColumns || isLoadingTasks || !board) {
        return (<></>)
    }

    let bgStyle: React.CSSProperties | undefined = undefined

    if (board.theme) {
        bgStyle = { background: board.theme.bg_value }
    }

    return (
        <>
            <div
                style={bgStyle}
                className="fixed left-0 right-0 top-10 bottom-0 flex items-stretch transition-all duration-300"
            >
                <LeftSideBar board={board} />
                <div className="flex flex-col flex-1">
                    <KanbanBoardTitle board={board} />
                    <div className="flex-1 relative">
                        <div className="absolute left-0 right-0 top-0 bottom-0">
                            <KanbanBoard />
                        </div>
                    </div>
                </div>
                <RightSideBar />
            </div>
        </>
    )
}

export default KanbanBoardPage