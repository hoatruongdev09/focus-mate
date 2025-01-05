import { useMemo, useState } from "react";
import PlusIcon from "../Icon/plus-icon";
import ColumnContainer from "./column-container";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./task-card";
import { AddGroupData, AddTaskData, Group, Task } from "../types/board-type";
import { useAddColumnsMutation, useAddTasksMutation, useDeleteColumnMutation, useDeleteTaskMutation, useUpdateTaskMutation } from "../store/services/board-service";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../store/store";
import { setColumns, setDraggingColumn, setDraggingTask, setTasks } from "../store/slices/board-slice";
import { DraggingItem } from "../types/draging-item";

function KanbanBoard() {

    const dispatch = useDispatch()

    const [addColumn] = useAddColumnsMutation()
    const [addTask] = useAddTasksMutation()
    const [deleteAColumn] = useDeleteColumnMutation()
    const [deleteATask] = useDeleteTaskMutation()
    const [updateTask] = useUpdateTaskMutation()

    const { columns, tasks, draggingColumn, draggingTask } = useSelector((state: AppRootState) => state.boardView)


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
        await addColumn(newColumn)
    }

    const createNewTask = async (id: number) => {
        const newTask: AddTaskData = {
            group_id: id,
            title: "test",
            description: `Task ${tasks.length} + 1`,
            estimate: 1,
            priority: 1
        }
        await addTask(newTask)
    }

    const deleteColumn = async (id: number) => {
        await deleteAColumn(id)
    }

    const deleteTask = async (id: number) => {
        await deleteATask(id)
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
    const doReorderTask = async (task: Task, frontTaskId: number | null, behindTaskId: number | null) => {
        if (!frontTaskId && !behindTaskId) { return }
        if (task == null) { return }
        await updateTask({
            ...task,
            behind_id: frontTaskId,
            front_id: behindTaskId
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

                const activeColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === activeColumnId)
                const overColumnIndex = columns.findIndex(c => `${DraggingItem.COLUMN}_${c.id}` === overColumnId)
                const resultColumns = arrayMove(columns, activeColumnIndex, overColumnIndex)
                dispatch(setColumns(resultColumns))
                break
            case DraggingItem.TASK:
                const activeTaskId = active.id
                const activeTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === activeTaskId)
                if (activeTaskIndex == -1) { break }
                const frontIndex = activeTaskIndex - 1;
                const behindIndex = activeTaskIndex + 1;

                const front_id: number | null = frontIndex < 0 ? null : tasks[frontIndex].id
                const behind_id: number | null = behindIndex >= tasks.length ? null : tasks[behindIndex].id
                doReorderTask(tasks[activeTaskIndex], front_id, behind_id)
                console.log("drag end on task")
                // if (!over) { break }
                // const overTaskId = over.id
                // if (activeTaskId === overTaskId) { break }
                // const overTaskIndex = tasks.findIndex(t => `${DraggingItem.TASK}_${t.id}` === overTaskId)
                // const resultTasks = arrayMove(tasks, activeTaskIndex, overTaskIndex)
                // dispatch(setTasks(resultTasks))
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
            dispatch(setTasks(arrayMove(tasks, activeTaskIndex, overTaskIndex)))
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
    // console.log(`tasks: `, tasks.map(t => t.id))
    return (
        <div className="pt-2 flex flex-col h-full w-full overflow-x-auto">
            <DndContext
                sensors={sensors}
                onDragStart={onDragStart}
                onDragEnd={onDragEnd}
                onDragOver={onDragOver}
            >
                <div className="flex gap-2 h-full">
                    <div className="flex gap-2 h-full justify-start items-stretch">
                        <SortableContext items={columnsId}>
                            {columns.map(col =>
                                <ColumnContainer
                                    key={`col-${col.id}`}
                                    column={col}
                                    deleteColumn={deleteColumn}
                                    createTask={createNewTask}
                                    tasks={tasks.filter(t => t.group_id === col.id)}
                                    deleteTask={deleteTask}
                                />
                            )}
                        </SortableContext>
                        <button className="
                            h-[60px] w-[350px] min-w-[350px] cursor-lg bg-white
                            border-2 p-4 hover:border-rose-500  flex gap-2 rounded-md"
                            onClick={createNewColumn}>
                            <PlusIcon /> Add column
                        </button>
                    </div>

                </div>
                {
                    createPortal(<DragOverlay>
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
                    </DragOverlay>, document.body)
                }
            </DndContext>

        </div>
    );
}

export default KanbanBoard;