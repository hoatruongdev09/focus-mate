
import ClockHolder from "./clock/clock-holder";
import TaskViewModal from "./task/update-task-view-modal";
import ColumnHolder from "./columns/column-holder";
import { useGetColumnsQuery } from "../services/columns";
import { createContext, useEffect } from "react";
import { ColumnData } from "../types/board-type";
import { useGetAllTasksQuery } from "../services/tasks";
import { useDispatch, useSelector } from "react-redux";
import { setColumns, setTasks } from "../store/slices/boardViewSlice";
import { RootState } from "../store/store";

export const ColumnContext = createContext<ColumnData[]>([])

function Workspace() {
    const dispatch = useDispatch()

    const { data: columns, isLoading: isColumnLoading } = useGetColumnsQuery()
    const { data: tasks, isLoading: isTaskLoading } = useGetAllTasksQuery()

    const cols = useSelector((state: RootState) => state.boardView.columns)

    useEffect(() => {
        if (tasks?.length) {
            dispatch(setTasks(tasks))
        }
        if (columns?.length) {
            dispatch(setColumns(columns))
        }
    }, [tasks, columns])

    if (isColumnLoading && isTaskLoading) {
        return (<>LOADING</>)
    }

    return (
        <ColumnContext.Provider value={cols}>
            <div className="bg-slate-900">
                <div className="min-h-screen mx-5">
                    <div className="flex flex-row min-h-screen items-center justify-center max-w-7xl mx-auto relative">
                        <div className="absolute left-0 top-24 right-0 bottom-8 flex flex-col gap-3">
                            <ClockHolder />
                            <ColumnHolder />
                        </div>
                    </div>
                </div>
            </div>
            <TaskViewModal />
        </ColumnContext.Provider>
    );
}

export default Workspace;