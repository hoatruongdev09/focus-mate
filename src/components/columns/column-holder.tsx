import { useState } from "react";
import TaskHolder from "../task/task-holder";
import TaskCreatingModal from "../task/task-creating-modal";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { ColumnData } from "../../store/slices/column-slice";
import UpdateColumnViewModal from "./update-colum-view-modal";

interface OpenModalProps {
    isOpen: boolean
    column: ColumnData | null
}

function ColumnHolder() {
    const [createTaskModalData, setCreateTaskModalData] = useState<OpenModalProps>({ isOpen: false, column: null })

    const state = useSelector((state: RootState) => {
        return {
            columns: state.columns.columns,
            tasks: state.tasks.tasks
        }
    });

    const onOpenCreateTask = (column: ColumnData): void => {
        setCreateTaskModalData({
            isOpen: true,
            column
        })
    }

    return (
        <>
            <div className="flex flex-row gap-2 overflow-x-scroll flex-1 no-scrollbar">
                {
                    [...state.columns].sort((a, b) => a.order_by - b.order_by).map((c) => (
                        <TaskHolder
                            key={`column-${c.id}`}
                            column={c}
                            tasks={state.tasks.filter(t => t.column_id === c.id)}
                            openCreateTask={onOpenCreateTask}
                        />
                    ))
                }
            </div>


            <TaskCreatingModal
                column={createTaskModalData.column}
                isOpen={createTaskModalData.isOpen}
                setIsOpen={(isOpen: boolean) => setCreateTaskModalData({ ...createTaskModalData, isOpen })}
            />
            <UpdateColumnViewModal />
        </>
    );
}

export default ColumnHolder;