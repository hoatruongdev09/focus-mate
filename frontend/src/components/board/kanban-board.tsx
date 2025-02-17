import { useEffect } from "react";
import { useGetCardsQuery, useGetListsQuery } from "../../store/services/board-service";
import { Board } from "../../types/board.type";
import BoardContent from "./board-content";
import ModalViewTask from "./modal-view-task";
import { useDispatch } from "react-redux";
import { setColumns, setTasks } from "../../store/slices/board-slice";

interface Props {
    board: Board
}

function KanbanBoard(props: Props) {
    const { board } = props
    const dispatch = useDispatch()
    const { data: columns, isLoading: isLoadingColumns } = useGetListsQuery(board.id)
    const { data: tasks, isLoading: isLoadingTasks } = useGetCardsQuery(board.id)


    useEffect(() => {
        if (columns && columns.data.length) {
            dispatch(setColumns([...columns.data].reverse()))
        }
        else {
            dispatch(setColumns([]))
        }
    }, [columns])

    useEffect(() => {
        if (tasks && tasks.data.length) {
            dispatch(setTasks(tasks.data.map(t => ({
                task: t,
                nextTimeUpdate: Date.now()
            }))))
        }
        else {
            dispatch(setTasks([]))
        }
    }, [tasks])



    return (
        <div className="pt-3 flex flex-col h-full w-full overflow-x-auto relative">
            <BoardContent />
            <ModalViewTask />
        </div>
    );




}

export default KanbanBoard;