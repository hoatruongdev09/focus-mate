
import ClockHolder from "./clock/clock-holder";
import TaskViewModal from "./task/update-task-view-modal";
import ColumnHolder from "./columns/column-holder";
import { useGetColumnsQuery } from "../services/columns";
import { createContext } from "react";
import { ColumnData } from "../types/board-type";

export const ColumnContext = createContext<ColumnData[]>([])

function Workspace() {
    const { data, isLoading, isError, error } = useGetColumnsQuery()
    if (isLoading) {
        return (<></>)
    } else if (isError) {
        return (<>{error.toString()}</>)
    }

    const columns = data ? [...data].sort((a, b) => a.order_by - b.order_by) : []

    return (
        <ColumnContext.Provider value={columns}>
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