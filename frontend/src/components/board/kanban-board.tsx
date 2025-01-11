import { useMemo, useRef } from "react";

import ColumnContainer from "./column/column-container";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    UniqueIdentifier,
    useSensor,
    useSensors,
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import TaskCard from "./task-card";
import { Group, Task } from "../../types/board-type";
import { useUpdateColumnMutation, useUpdateTaskMutation } from "../../store/services/board-service";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../../store/store";
import { setColumns, setDraggingColumn, setDraggingTask, setTasks, setViewingTask } from "../../store/slices/board-slice";
import { DraggingItem } from "../../types/draging-item";
import Modal from "../modal";
import TaskView from "./task-view/task-view";
import { createPortal } from "react-dom";
import NewColumnCreator from "./new-column-creator";

function KanbanBoard() {

    const dispatch = useDispatch()

    const [requestUpdateTask] = useUpdateTaskMutation()
    const [requestUpdateColumn] = useUpdateColumnMutation()

    const { columns, tasks, draggingColumn, draggingTask } = useSelector((state: AppRootState) => state.boardView)
    const { viewingTask } = useSelector((state: AppRootState) => state.boardView)

    const columnHeightRef = useRef<{ [id: number]: number }>({})

    const setColumnRef = (id: number, node: HTMLElement) => {
        columnHeightRef.current[id] = node.clientHeight
    }

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        })
    )


    const onDragStart = (event: DragStartEvent) => {
        switch (event.active.data.current?.type) {
            case DraggingItem.COLUMN:
                dispatch(setDraggingColumn(event.active.data.current.column))
                break
            case DraggingItem.TASK:
                dispatch(setDraggingTask(event.active.data.current.task))
                break
        }
    }

    const doReorderColumn = async (column: Group, frontId: number | null, behindId: number | null) => {
        if (!frontId && !behindId) { return }
        if (column == null) { return }
        await requestUpdateColumn({
            ...column,
            front_id: frontId,
            behind_id: behindId
        })
    }

    const doReorderTask = async (task: Task, frontTaskId: number | null, behindTaskId: number | null) => {
        if (!frontTaskId && !behindTaskId) { return }
        if (task == null) { return }
        await requestUpdateTask({
            ...task,
            front_id: frontTaskId,
            behind_id: behindTaskId
        })
    }

    const dropColumn = (activeColumnId: UniqueIdentifier, overColumnId: UniqueIdentifier) => {
        if (activeColumnId === overColumnId) { return }

        let activeColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId)
        if (activeColumnIndex == -1) { return }
        let overColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === overColumnId)
        const resultColumns = arrayMove(columns, activeColumnIndex, overColumnIndex)

        activeColumnIndex = resultColumns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId)
        const frontColumnIndex = activeColumnIndex - 1
        const behindColumnIndex = activeColumnIndex + 1

        const frontColumnId: number | null = frontColumnIndex < 0 ? null : resultColumns[frontColumnIndex].id
        const behindColumnId: number | null = behindColumnIndex >= columns.length ? null : resultColumns[behindColumnIndex].id

        dispatch(setColumns(resultColumns))
        doReorderColumn(resultColumns[activeColumnIndex], frontColumnId, behindColumnId)
    }

    const dropTask = (activeTaskId: UniqueIdentifier) => {
        const activeTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === activeTaskId)
        if (activeTaskIndex == -1) { return }
        const frontTaskIndex = activeTaskIndex - 1
        const behindTaskIndex = activeTaskIndex + 1

        const frontTaskId: number | null = frontTaskIndex < 0 ? null : tasks[frontTaskIndex].id
        const behindTaskId: number | null = behindTaskIndex >= tasks.length ? null : tasks[behindTaskIndex].id
        doReorderTask(tasks[activeTaskIndex], behindTaskId, frontTaskId)
    }

    const onDragEnd = (event: DragEndEvent) => {
        dispatch(setDraggingColumn(null))
        dispatch(setDraggingTask(null))
        const { active, over } = event
        switch (event.active.data.current?.type) {
            case DraggingItem.COLUMN:
                const activeColumnId = active.id
                if (!over) { return }
                const overColumnId = over.id
                dropColumn(activeColumnId, overColumnId)
                break
            case DraggingItem.TASK:
                const activeTaskId = active.id
                dropTask(activeTaskId)
                break;
        }
    }
    const moveTaskOverTask = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
        console.log("move over task")
        // const activeTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === activeId);
        // const overTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === overId);
        // const activeTask = { ...tasks[activeTaskIndex] };
        // const overlapsTask = tasks[overTaskIndex];
        // activeTask.group_id = overlapsTask.group_id;
        // const newTasks = [...tasks];
        // newTasks[activeTaskIndex] = activeTask;
        // dispatch(setTasks(arrayMove(newTasks, activeTaskIndex, overTaskIndex)));
    }
    const moveTaskOverColumn = (activeId: UniqueIdentifier, overId: UniqueIdentifier) => {
        const activeTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === activeId);
        const task: Task = {
            ...tasks[activeTaskIndex],
            group_id: Number((overId as string).split("_")[1])
        };
        const newTasks = [...tasks];
        newTasks[activeTaskIndex] = task;
        dispatch(setTasks(newTasks));
    }
    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) { return }
        const activeId = active.id
        const overId = over.id

        let isOverTask = over.data.current?.type === DraggingItem.TASK
        let isOverColumn = over.data.current?.type === DraggingItem.COLUMN
        if (activeId === overId) { return }

        switch (event.active.data.current?.type) {
            case DraggingItem.TASK:
                if (isOverTask) {
                    moveTaskOverTask(activeId, overId);
                    break
                }
                if (isOverColumn) {
                    moveTaskOverColumn(activeId, overId);
                    break
                }
                break
            case DraggingItem.COLUMN:
                break
        }
    }


    const columnsId = useMemo(() => columns.map(col => `${DraggingItem.COLUMN}_${col.id}`), [columns])
    return (
        <div className="pt-2 flex flex-col h-full w-full overflow-x-auto relative">
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
                                    tasks={tasks.filter(t => t.group_id == col.id)}
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
                                    tasks={tasks.filter(t => t.group_id == draggingColumn.id)}
                                />
                            }
                            {
                                draggingTask &&
                                <TaskCard task={draggingTask} />
                            }
                        </DragOverlay>, document.body)
                }
            </DndContext>
            <Modal
                isShow={viewingTask != null}
                onBgClick={() => { dispatch(setViewingTask(null)) }}
            >
                {
                    viewingTask &&
                    <TaskView
                        task={viewingTask}
                        onCloseClick={() => dispatch(setViewingTask(null))}
                    />
                }
            </Modal>
        </div>
    );




}

export default KanbanBoard;