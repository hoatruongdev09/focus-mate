import { useDispatch, useSelector } from "react-redux"
import KanbanBoard from "../components/board/kanban-board"
import KanbanBoardTitle from "../components/board/kanban-board-title"
import { useGetBoardQuery, useGetListsQuery, useGetCardsQuery } from "../store/services/board-service"
import { useEffect } from "react"
import { setBoard, setColumns, setTasks } from "../store/slices/board-slice"
import { Navigate, useLocation, useParams } from "react-router-dom"
import RightSideBar from "../components/right-side-bar/right-side-bar"
import { AppRootState } from "../store/store"


const WorkspaceBoardView = () => {
    const { board_id } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()

    if (!board_id) {
        return <Navigate to={'/'} state={{ from: location }} />
    }
    const selectedBoard = useSelector((state: AppRootState) => state.boardView.board)
    const { data: board, isLoading: isLoadingBoard } = useGetBoardQuery(+board_id)
    const { data: columns, isLoading: isLoadingColumns } = useGetListsQuery(+board_id)
    const { data: tasks, isLoading: isLoadingTasks } = useGetCardsQuery(+board_id)

    useEffect(() => {
        return () => {
            dispatch(setBoard(null))
        }
    }, [])

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


    if (isLoadingColumns || isLoadingTasks || isLoadingBoard || !selectedBoard) {
        return (<>Loading</>)
    }

    return (
        <>
            <div className="flex flex-col flex-1">
                <KanbanBoardTitle
                    board={selectedBoard}
                />
                <div className="flex-1 relative">
                    <div className="absolute left-0 right-0 top-0 bottom-0">
                        <KanbanBoard />
                    </div>
                </div>
            </div>
            <RightSideBar />
        </>
    )
}

export default WorkspaceBoardView