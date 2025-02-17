import { useDispatch } from "react-redux"
import KanbanBoard from "../components/board/kanban-board"
import KanbanBoardTitle from "../components/board/kanban-board-title"
import { useGetBoardByNameQuery } from "../store/services/board-service"
import { useEffect } from "react"
import { setBoard } from "../store/slices/board-slice"
import { Navigate, useLocation, useParams } from "react-router-dom"
import RightSideBar from "../components/right-side-bar/right-side-bar"


const WorkspaceBoardView = () => {
    const { workspace_short_name, board_name } = useParams()
    const dispatch = useDispatch()
    const location = useLocation()

    if (!board_name || !workspace_short_name) {
        return <Navigate to={'/'} state={{ from: location }} />
    }
    const {
        data: board,
        isLoading: isLoadingBoard,
        isError: isLoadBoardError,
        error: loadBoardError
    } = useGetBoardByNameQuery({ workspace_short_name, board_name })


    useEffect(() => {
        if (board && board.data) {
            dispatch(setBoard(board.data))
        }
    }, [board])

    useEffect(() => {
        return () => {
            dispatch(setBoard(null))
        }
    }, [])


    if (isLoadingBoard) {
        return (<>Loading</>)
    }

    if (isLoadBoardError) {
        return <>{JSON.stringify(loadBoardError)}</>
    }



    return (
        <>
            <div className="flex flex-col flex-1">
                {
                    board && <KanbanBoardTitle
                        board={board.data}
                    />
                }
                <div className="flex-1 relative">
                    <div className="absolute left-0 right-0 top-0 bottom-0">
                        {
                            board && <KanbanBoard
                                board={board.data}
                            />
                        }
                    </div>
                </div>
            </div>
            <RightSideBar />
        </>
    )
}

export default WorkspaceBoardView