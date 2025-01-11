import { useMemo } from "react";
import PlusIcon from "../Icon/plus-icon";
import ColumnContainer from "./column-container";
import {
    DndContext,
    DragEndEvent,
    DragOverEvent,
    DragOverlay,
    DragStartEvent,
    PointerSensor,
    useSensor,
    useSensors,
    closestCenter
} from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./task-card";
import { AddGroupData, AddTaskData, Group, Task } from "../types/board-type";
import { useAddColumnsMutation, useAddTasksMutation, useDeleteColumnMutation, useDeleteTaskMutation, useUpdateColumnMutation, useUpdateTaskMutation } from "../store/services/board-service";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../store/store";
import { setColumns, setDraggingColumn, setDraggingTask, setTasks, setViewingTask } from "../store/slices/board-slice";
import { DraggingItem } from "../types/draging-item";
import Modal from "./modal";
import TaskView from "./task-view/task-view";

function KanbanBoard() {

    const dispatch = useDispatch()

    const [requestAddColumn] = useAddColumnsMutation()
    const [requestAddTask] = useAddTasksMutation()
    const [requestDeleteAColumn] = useDeleteColumnMutation()
    const [requestDeleteATask] = useDeleteTaskMutation()
    const [requestUpdateTask] = useUpdateTaskMutation()
    const [requestUpdateColumn] = useUpdateColumnMutation()

    const { columns, tasks, draggingColumn, draggingTask } = useSelector((state: AppRootState) => state.boardView)
    const { viewingTask } = useSelector((state: AppRootState) => state.boardView)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        })
    )

    const createNewColumn = async () => {
        const newColumn: AddGroupData = {
            name: `column ${columns.length + 1}`,
            description: `new group`
        }
        await requestAddColumn(newColumn)
    }

    const createNewTask = async (group_id: number, title: string) => {
        const newTask: AddTaskData = {
            group_id,
            title,
            description: ``,
            estimate: 1,
            priority: 1
        }
        await requestAddTask(newTask)
    }

    const deleteColumn = async (id: number) => {
        await requestDeleteAColumn(id)
    }

    const deleteTask = async (id: number) => {
        await requestDeleteATask(id)
    }

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

    const onDragEnd = (event: DragEndEvent) => {
        dispatch(setDraggingColumn(null))
        dispatch(setDraggingTask(null))
        const { active, over } = event
        switch (event.active.data.current?.type) {
            case DraggingItem.COLUMN:
                const activeColumnId = active.id
                if (!over) { break }
                const overColumnId = over.id
                if (activeColumnId === overColumnId) { break }

                let activeColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId)
                if (activeColumnIndex == -1) { break }
                let overColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === overColumnId)
                const resultColumns = arrayMove(columns, activeColumnIndex, overColumnIndex)

                activeColumnIndex = resultColumns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId)
                const frontColumnIndex = activeColumnIndex - 1
                const behindColumnIndex = activeColumnIndex + 1

                const frontColumnId: number | null = frontColumnIndex < 0 ? null : resultColumns[frontColumnIndex].id
                const behindColumnId: number | null = behindColumnIndex >= columns.length ? null : resultColumns[behindColumnIndex].id

                dispatch(setColumns(resultColumns))
                doReorderColumn(resultColumns[activeColumnIndex], frontColumnId, behindColumnId)
                break
            case DraggingItem.TASK:
                const activeTaskId = active.id
                const activeTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === activeTaskId)
                if (activeTaskIndex == -1) { break }
                const frontTaskIndex = activeTaskIndex - 1
                const behindTaskIndex = activeTaskIndex + 1

                const frontTaskId: number | null = frontTaskIndex < 0 ? null : tasks[frontTaskIndex].id
                const behindTaskId: number | null = behindTaskIndex >= tasks.length ? null : tasks[behindTaskIndex].id
                doReorderTask(tasks[activeTaskIndex], behindTaskId, frontTaskId)
                break;
        }
    }

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) { return }
        const activeId = active.id
        const overId = over.id

        if (activeId === overId) { return }

        const isActiveTask = active.data.current?.type === DraggingItem.TASK
        if (!isActiveTask) { return }

        const isOverTask = over.data.current?.type === DraggingItem.TASK

        if (isActiveTask && isOverTask) {
            const activeTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === activeId)
            const overTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === overId)
            const activeTask = { ...tasks[activeTaskIndex] }
            const overlapsTask = tasks[overTaskIndex]
            activeTask.group_id = overlapsTask.group_id
            const newTasks = [...tasks]
            newTasks[activeTaskIndex] = activeTask
            dispatch(setTasks(arrayMove(newTasks, activeTaskIndex, overTaskIndex)))
            return
        }

        const isOverColumn = over.data.current?.type === DraggingItem.COLUMN

        if (isActiveTask && isOverColumn) {
            const activeTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === activeId)
            const task: Task = {
                ...tasks[activeTaskIndex],
                group_id: Number((overId as string).split("_")[1])
            }
            const newTasks = [...tasks]
            newTasks[activeTaskIndex] = task
            dispatch(setTasks(newTasks))
            return
        }
    }
    const columnsId = useMemo(() => columns.map(col => `${DraggingItem.COLUMN}_${col.id}`), [columns])

    return (
        <div className="pt-2 flex flex-col h-full w-full overflow-x-auto">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
                collisionDetection={closestCenter}
            >
                <div className="flex gap-2 h-full">
                    <div className="flex gap-2 h-full justify-start items-start">
                        <SortableContext items={columnsId}>
                            {columns.map(col =>
                                <ColumnContainer
                                    key={`col-${col.id}`}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    createTask={createNewTask}
                                    tasks={tasks.filter(t => t.group_id === col.id && !t.archived)}
                                    deleteTask={deleteTask}
                                />
                            )}
                        </SortableContext>
                        <button className="
                            h-[60px] w-72 cursor-lg bg-white
                            border-2 p-4 hover:border-rose-500  flex gap-2 rounded-md"
                            onClick={createNewColumn}>
                            <PlusIcon /> Add column
                        </button>
                    </div>

                </div>
                {
                    createPortal(
                        <DragOverlay>
                            {
                                draggingColumn &&
                                <ColumnContainer
                                    column={draggingColumn}
                                    deleteColumn={deleteColumn}
                                    createTask={createNewTask}
                                    tasks={tasks.filter(t => t.group_id === draggingColumn.id)}
                                    deleteTask={deleteTask}
                                />
                            }
                            {
                                draggingTask &&
                                <TaskCard
                                    task={draggingTask}
                                    deleteTask={deleteTask}
                                />
                            }
                        </DragOverlay>,
                        document.body)
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