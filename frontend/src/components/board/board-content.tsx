import { useDispatch, useSelector } from "react-redux";
import { DraggingItem } from "../../types/draging-item";
import { useUpdateColumnMutation, useUpdateTaskMutation } from "../../store/services/board-service";
import { useCallback, useMemo, useRef } from "react";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, UniqueIdentifier, useSensor, useSensors } from "@dnd-kit/core";
import { changeTaskGroup, setColumns, setDraggingColumn, setDraggingTask, setTasks } from "../../store/slices/board-slice";
import { AppRootState } from "../../store/store";
import { Group, Task } from "../../types/board-type";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "./column/column-container";
import NewColumnCreator from "./new-column-creator";
import TaskCard from "./task-card";

function BoardContent() {
    const dispatch = useDispatch()

    const [requestUpdateTask] = useUpdateTaskMutation()
    const [requestUpdateColumn] = useUpdateColumnMutation()

    const { columns, tasks, draggingColumn, draggingTask } = useSelector((state: AppRootState) => state.boardView)

    const columnHeightRef = useRef<{ [id: number]: number }>({})

    const setColumnRef = useCallback((id: number, node: HTMLElement) => {
        columnHeightRef.current[id] = node.clientHeight
    }, [])

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        })
    )


    const onDragStart = useCallback((event: DragStartEvent) => {
        switch (event.active.data.current?.type) {
            case DraggingItem.COLUMN:
                dispatch(setDraggingColumn(event.active.data.current.column));
                break;
            case DraggingItem.TASK:
                dispatch(setDraggingTask(event.active.data.current.task));
                break;
        }
    }, [dispatch]);

    const doReorderColumn = useCallback(async (column: Group, frontId: number | null, behindId: number | null) => {
        if (!frontId && !behindId) { return; }
        if (column == null) { return; }
        await requestUpdateColumn({
            ...column,
            front_id: frontId,
            behind_id: behindId
        });
    }, [requestUpdateColumn]);

    const doReorderTask = useCallback(async (task: Task, frontTaskId: number | null, behindTaskId: number | null) => {
        if (!frontTaskId && !behindTaskId) { return; }
        if (task == null) { return; }
        await requestUpdateTask({
            ...task,
            front_id: frontTaskId,
            behind_id: behindTaskId
        });
    }, [requestUpdateTask]);

    const dropColumn = useCallback((activeColumnId: UniqueIdentifier, overColumnId: UniqueIdentifier) => {
        if (activeColumnId === overColumnId) { return; }

        let activeColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId);
        if (activeColumnIndex == -1) { return; }
        let overColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === overColumnId);
        const resultColumns = arrayMove(columns, activeColumnIndex, overColumnIndex);

        activeColumnIndex = resultColumns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId);
        const frontColumnIndex = activeColumnIndex - 1;
        const behindColumnIndex = activeColumnIndex + 1;

        const frontColumnId: number | null = frontColumnIndex < 0 ? null : resultColumns[frontColumnIndex].id;
        const behindColumnId: number | null = behindColumnIndex >= columns.length ? null : resultColumns[behindColumnIndex].id;

        dispatch(setColumns(resultColumns));
        doReorderColumn(resultColumns[activeColumnIndex], frontColumnId, behindColumnId);
    }, [columns, dispatch, doReorderColumn]);

    const dropTask = useCallback((activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
        const activeTaskId = +activeId.toString().replace(`${DraggingItem.TASK}_`, '');
        const overTaskId = +overId.toString().replace(`${DraggingItem.TASK}_`, '');
        let activeTaskIndex = tasks.findIndex(t => t.task.id === activeTaskId);
        if (activeTaskIndex == -1) { return; }
        let overTaskIndex = tasks.findIndex(t => t.task.id === overTaskId);
        const resultTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex);

        activeTaskIndex = resultTasks.findIndex(t => t.task.id === activeTaskId);
        const frontTaskIndex = activeTaskIndex - 1;
        const behindTaskIndex = activeTaskIndex + 1;

        const frontTaskId: number | null = frontTaskIndex < 0 ? null : resultTasks[frontTaskIndex].task.id;
        const behindTaskId: number | null = behindTaskIndex >= resultTasks.length ? null : resultTasks[behindTaskIndex].task.id;
        dispatch(setTasks(resultTasks));
        doReorderTask(resultTasks[activeTaskIndex].task, behindTaskId, frontTaskId);
    }, [tasks, dispatch, doReorderTask]);

    const onDragEnd = useCallback((event: DragEndEvent) => {
        dispatch(setDraggingColumn(null));
        dispatch(setDraggingTask(null));
        const { active, over } = event;
        const activeColumnId = active.id;
        if (!over) { return; }
        const overColumnId = over.id;
        switch (event.active.data.current?.type) {
            case DraggingItem.COLUMN:
                dropColumn(activeColumnId, overColumnId);
                break;
            case DraggingItem.TASK:
                dropTask(activeColumnId, overColumnId);
                break;
        }
    }, [dispatch, dropColumn, dropTask]);

    const moveTaskOverTask = useCallback((activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
        const activeTaskId = +activeId.toString().replace(`${DraggingItem.TASK}_`, '');
        const overTaskId = +overId.toString().replace(`${DraggingItem.TASK}_`, '');
        const activeTask = tasks.find(t => t.task.id === activeTaskId);
        if (!activeTask) { return; }
        const overTask = tasks.find(t => t.task.id === overTaskId);
        if (overTask == null) { return; }
        if (activeTask.task.group_id == overTask.task.group_id) { return; }
        dispatch(changeTaskGroup({ id: activeTask.task.id, groupId: overTask.task.group_id }));
    }, [tasks, dispatch]);

    const moveTaskOverColumn = useCallback((activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
        const id = +activeId.toString().replace(`${DraggingItem.TASK}_`, '');
        const task = tasks.find(t => t.task.id === id);
        if (!task) { return; }
        const groupId = Number((overId as string).split("_")[1]);
        if (task.task.group_id == groupId) { return; }
        dispatch(changeTaskGroup({ id: task.task.id, groupId }));
    }, [tasks, dispatch]);

    const onDragOver = useCallback((event: DragOverEvent) => {
        const { active, over } = event;
        if (!over) { return; }
        const activeId = active.id;
        const overId = over.id;

        let isOverTask = over.data.current?.type === DraggingItem.TASK;
        let isOverColumn = over.data.current?.type === DraggingItem.COLUMN;
        if (activeId === overId) { return; }

        switch (event.active.data.current?.type) {
            case DraggingItem.TASK:
                if (isOverTask) {
                    moveTaskOverTask(activeId, overId);
                    break;
                } else if (isOverColumn) {
                    moveTaskOverColumn(activeId, overId);
                    break;
                }
                break;
            case DraggingItem.COLUMN:
                break;
        }
    }, [moveTaskOverTask, moveTaskOverColumn]);

    const renderTasks = useMemo(() => tasks.map(t => t.task), [tasks])
    const columnsId = useMemo(() => columns.map(col => `${DraggingItem.COLUMN}_${col.id}`), [columns])

    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >

            <div className="flex flex-1 gap-2 h-full z-10">
                <div className="flex gap-2 h-full justify-start items-start">
                    <SortableContext items={columnsId}>
                        {columns.map(col =>
                            <ColumnContainer
                                key={`col-${col.id}`}
                                column={col}
                                isOverlay={false}
                                setRef={setColumnRef}
                                tasks={renderTasks.filter(t => t.group_id == col.id)}
                            />
                        )}
                    </SortableContext>
                    <NewColumnCreator />
                </div>
            </div>

            {
                createPortal(
                    <DragOverlay>
                        {
                            draggingColumn &&
                            <ColumnContainer
                                column={draggingColumn}
                                isOverlay={true}
                                targetHeight={columnHeightRef.current[draggingColumn.id]}
                                tasks={renderTasks.filter(t => t.group_id == draggingColumn.id)}
                            />
                        }
                        {
                            draggingTask &&
                            <TaskCard task={draggingTask} />
                        }
                    </DragOverlay>, document.body)
            }
        </DndContext>
    );
}

export default BoardContent;