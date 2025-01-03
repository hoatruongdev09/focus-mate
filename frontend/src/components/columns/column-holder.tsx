import { useContext, useState } from "react";
import Column from "./column";
import TaskCreatingModal from "../task/task-creating-modal";
import UpdateColumnViewModal from "./update-column-view-modal";
import CreateColumnViewModal from "./create-column-view-modal";
import { ColumnData } from "../../types/board-type";
import { ColumnContext } from "../workspace";
import { useDispatch } from "react-redux";
import { setShowAddingColumn } from "../../store/slices/column-slice";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";


function ColumnHolder() {
    const dispatch = useDispatch()

    const columns = useContext(ColumnContext)


    const showAddColumn = () => {
        dispatch(setShowAddingColumn(true))
    }

    return (
        <DndProvider backend={HTML5Backend}>
            <div className="flex flex-row gap-2 overflow-x-scroll flex-1 no-scrollbar">
                {
                    columns.sort((a, b) => a.order_by - b.order_by).map((c) => (
                        <Column
                            key={`column-${c.id}`}
                            column={c}
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
        </DndProvider>
    );
}

export default ColumnHolder;