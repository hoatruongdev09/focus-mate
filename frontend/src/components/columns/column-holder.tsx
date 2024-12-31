import { useContext, useState } from "react";
import Column from "./column";
import TaskCreatingModal from "../task/task-creating-modal";
import UpdateColumnViewModal from "./update-column-view-modal";
import CreateColumnViewModal from "./create-column-view-modal";
import { ColumnData } from "../../types/board-type";
import { ColumnContext } from "../workspace";
import { useDispatch } from "react-redux";
import { setSelectingColumn } from "../../store/slices/task-view-slice";
import { setShowAddingColumn } from "../../store/slices/column-slice";


function ColumnHolder() {
    const dispatch = useDispatch()

    const columns = useContext(ColumnContext)



    const onOpenCreateTask = (column: ColumnData): void => {
        dispatch(setSelectingColumn(column))
    }

    const showAddColumn = () => {
        dispatch(setShowAddingColumn(true))
    }

    return (
        <>
            <div className="flex flex-row gap-2 overflow-x-scroll flex-1 no-scrollbar">
                {
                    columns.sort((a, b) => a.order_by - b.order_by).map((c) => (
                        <Column
                            key={`column-${c.id}`}
                            column={c}
                            openCreateTask={onOpenCreateTask}
                        />
                    ))
                }
                <div className="p-1">
                    <button
                        className="w-9 h-9 bg-slate-500 rounded-sm"
                        onClick={() => showAddColumn()}
                    >+</button>
                </div>
            </div>


            <TaskCreatingModal />
            <UpdateColumnViewModal />
            <CreateColumnViewModal />
        </>
    );
}

export default ColumnHolder;