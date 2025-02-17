import { useDispatch, useSelector } from "react-redux";
import { DraggingItem } from "../../types/draging-item.type";
import { useUpdateListMutation, useUpdateCardMutation } from "../../store/services/board-service";
import { useCallback, useMemo, useRef } from "react";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors
} from "@dnd-kit/core";
import {
    changeTaskGroup,
    setColumns,
    setDraggingColumn,
    setDraggingTask,
    setTasks
} from "../../store/slices/board-slice";
import { AppRootState } from "../../store/store";
import { List, Card } from "../../types/board.type";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import ColumnContainer from "./column/column-container";
import NewColumnCreator from "./new-column-creator";
import TaskCard from "./task-card";

function BoardContent() {
    const dispatch = useDispatch()

    const [requestUpdateTask] = useUpdateCardMutation()
    const [requestUpdateColumn] = useUpdateListMutation()

    const { columns, tasks, draggingColumn, draggingTask, board } = useSelector((state: AppRootState) => state.boardView)
    const renderTasks = useMemo(() => tasks.filter(t => !t.task.archived), [tasks])

    const renderColumns = useMemo(() => columns.filter(t => !t.archived), [columns])
    const columnIds = useMemo(() => columns.map(col => `${DraggingItem.COLUMN}_${col.id}`), [renderColumns])
    const columnHeightRef = useRef<{ [id: string]: number }>({})

    const setColumnRef = useCallback((id: string, node: HTMLElement) => {
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

    const doReorderColumn = useCallback(async (column: List, frontId: string | null, behindId: string | null) => {
        if (column == null) { return; }
        await requestUpdateColumn({
            ...column,
            front_id: frontId,
            behind_id: behindId
        });
    }, [requestUpdateColumn]);

    const doReorderTask = useCallback(async (task: Card, frontTaskId: string | null, behindTaskId: string | null) => {
        console.log(`update task ${frontTaskId} ${behindTaskId}`)
        if (!task || !board) { return; }
        await requestUpdateTask({
            ...task,
            board_id: board.id,
            front_id: frontTaskId,
            behind_id: behindTaskId
        });
    }, [requestUpdateTask, board]);

    const dropColumn = useCallback((activeColumnId: UniqueIdentifier, overColumnId: UniqueIdentifier) => {
        if (activeColumnId === overColumnId) { return; }

        let activeColumnIndex = renderColumns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId);
        if (activeColumnIndex == -1) { return; }
        let overColumnIndex = renderColumns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === overColumnId);
        const resultColumns = arrayMove(renderColumns, activeColumnIndex, overColumnIndex);

        activeColumnIndex = resultColumns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId);
        const frontColumnIndex = activeColumnIndex - 1;
        const behindColumnIndex = activeColumnIndex + 1;

        const frontColumnId: string | null = frontColumnIndex < 0 ? null : resultColumns[frontColumnIndex].id;
        const behindColumnId: string | null = behindColumnIndex >= renderColumns.length ? null : resultColumns[behindColumnIndex].id;

        dispatch(setColumns(resultColumns));
        doReorderColumn(resultColumns[activeColumnIndex], frontColumnId, behindColumnId);
    }, [renderColumns, dispatch, doReorderColumn]);

    const dropTask = useCallback((activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
        const activeTaskId = activeId.toString().replace(`${DraggingItem.TASK}_`, '');
        const overTaskId = overId.toString().replace(`${DraggingItem.TASK}_`, '');
        let activeTaskIndex = renderTasks.findIndex(t => t.task.id === activeTaskId);
        if (activeTaskIndex == -1) { return; }
        let overTaskIndex = renderTasks.findIndex(t => t.task.id === overTaskId);
        const resultTasks = arrayMove(renderTasks, activeTaskIndex, overTaskIndex);

        activeTaskIndex = resultTasks.findIndex(t => t.task.id === activeTaskId);
        const frontTaskIndex = activeTaskIndex - 1;
        const behindTaskIndex = activeTaskIndex + 1;

        const frontTaskId: string | null = frontTaskIndex < 0 ? null : resultTasks[frontTaskIndex].task.id;
        const behindTaskId: string | null = behindTaskIndex >= resultTasks.length ? null : resultTasks[behindTaskIndex].task.id;
        dispatch(setTasks(resultTasks));
        doReorderTask(resultTasks[activeTaskIndex].task, behindTaskId, frontTaskId);
    }, [renderTasks, dispatch, doReorderTask]);

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
        const activeTaskId = activeId.toString().replace(`${DraggingItem.TASK}_`, '');
        const overTaskId = overId.toString().replace(`${DraggingItem.TASK}_`, '');
        const activeTask = renderTasks.find(t => t.task.id === activeTaskId);
        if (!activeTask) { return; }
        const overTask = renderTasks.find(t => t.task.id === overTaskId);
        if (overTask == null) { return; }
        if (activeTask.task.list_id == overTask.task.list_id) { return; }
        dispatch(changeTaskGroup({ id: activeTask.task.id, groupId: overTask.task.list_id }));
    }, [renderTasks, dispatch]);

    const moveTaskOverColumn = useCallback((activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
        const id = activeId.toString().replace(`${DraggingItem.TASK}_`, '');
        const task = renderTasks.find(t => t.task.id === id)
        if (!task) { return; }
        const groupId = (overId as string).split("_")[1]
        if (task.task.list_id == groupId) { return; }
        dispatch(changeTaskGroup({ id: task.task.id, groupId }));
    }, [renderTasks, dispatch]);

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



    return (
        <DndContext
            sensors={sensors}
            onDragStart={onDragStart}
            onDragEnd={onDragEnd}
            onDragOver={onDragOver}
        >

            <div className="flex flex-1 gap-2 h-full z-10">
                <div className="flex gap-2 h-full justify-start items-start px-3">
                    <SortableContext items={columnIds}>
                        {renderColumns.map(col =>
                            <ColumnContainer
                                key={`col-${col.id}`}
                                column={col}
                                isOverlay={false}
                                setRef={setColumnRef}
                                tasks={renderTasks.map(t => t.task).filter(t => t.list_id == col.id)}
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
                                tasks={renderTasks.map(t => t.task).filter(t => t.list_id == draggingColumn.id)}
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