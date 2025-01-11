import { useSelector } from "react-redux";
import ColumnContainer from "./column/column-container";
import { AppRootState } from "../../store/store";
import { Group, Task } from "../../types/board-type";
import TaskCard from "./task-card";

export function DraggingColumnOverlay({ table, refs }: {
    table: {
        column: Group;
        tasks: Task[];
    }[],
    refs: React.MutableRefObject<{
        [id: number]: number;
    }>
}) {

    const { draggingColumn } = useSelector((state: AppRootState) => state.boardView)
    return (
        draggingColumn &&
        <ColumnContainer
            column={draggingColumn}
            isOverlay={true}
            targetHeight={refs.current[draggingColumn.id]}
            tasks={table.find(t => t.column.id == draggingColumn.id)?.tasks ?? []}
        />
    );
}

export function DraggingTaskOverlay() {
    const { draggingTask } = useSelector((state: AppRootState) => state.boardView)

    return (
        draggingTask &&
        <TaskCard task={draggingTask} />
    );
}
