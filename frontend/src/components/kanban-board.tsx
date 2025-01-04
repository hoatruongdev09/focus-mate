import { useMemo, useState } from "react";
import PlusIcon from "../Icon/plus-icon";
import { Column, Id, Task } from "../types";
import ColumnContainer from "./column-container";
import { DndContext, DragEndEvent, DragOverEvent, DragOverlay, DragStartEvent, PointerSensor, useSensor, useSensors } from "@dnd-kit/core";
import { arrayMove, SortableContext } from "@dnd-kit/sortable";
import { createPortal } from "react-dom";
import TaskCard from "./task-card";

function KanbanBoard() {

    const [columns, setColumns] = useState<Column[]>([])
    const [tasks, setTasks] = useState<Task[]>([])
    const [activeColumn, setActiveColumn] = useState<Column | null>(null)
    const [activeTask, setActiveTask] = useState<Task | null>(null)

    const sensors = useSensors(
        useSensor(PointerSensor, {
            activationConstraint: {
                distance: 10
            }
        })
    )

    const createNewColumn = () => {
        const newColumn: Column = {
            id: Date.now(),
            title: `column ${columns.length + 1}`
        }
        setColumns([...columns, newColumn])
    }

    const createNewTask = (id: Id) => {
        const newTask: Task = {
            id: Date.now(),
            columnId: id,
            content: `Task ${tasks.length} + 1`
        }
        setTasks([...tasks, newTask])
    }

    const deleteColumn = (id: Id) => {
        const cols = columns.filter(c => c.id != id)
        setColumns(cols)
    }

    const deleteTask = (id: Id) => {
        const t = tasks.filter(task => task.id !== id)
        setTasks(t)
    }

    const onDragStart = (event: DragStartEvent) => {
        switch (event.active.data.current?.type) {
            case "Column":
                setActiveColumn(event.active.data.current.column)
                break
            case "Task":
                setActiveTask(event.active.data.current.task)
                break
        }
    }
    const onDragEnd = (event: DragEndEvent) => {
        setActiveColumn(null)
        setActiveTask(null)
        const { active, over } = event
        switch (event.active.data.current?.type) {
            case "Column":
                const activeColumnId = active.id
                if (!over) { break }
                const overColumnId = over.id
                if (activeColumnId === overColumnId) { break }

                setColumns(columns => {
                    const activeColumnIndex = columns.findIndex(c => c.id === activeColumnId)
                    const overColumnIndex = columns.findIndex(c => c.id === overColumnId)

                    return arrayMove(columns, activeColumnIndex, overColumnIndex)
                })
                break
            case "Task":
                const activeTaskId = active.id
                if (!over) { break }
                const overTaskId = over.id
                if (activeTaskId === overTaskId) { break }

                setTasks(tasks => {
                    const activeTaskIndex = tasks.findIndex(t => t.id === activeTaskId)
                    const overTaskIndex = tasks.findIndex(t => t.id === overTaskId)
                    return arrayMove(tasks, activeTaskIndex, overTaskIndex)
                })
                break;
        }
    }

    const onDragOver = (event: DragOverEvent) => {
        const { active, over } = event
        if (!over) { return }

        const activeId = active.id
        const overId = over.id

        if (activeId === overId) { return }

        const isActiveTask = active.data.current?.type === "Task"
        if (!isActiveTask) { return }

        const isOverTask = over.data.current?.type === "Task"
        if (isActiveTask && isOverTask) {
            setTasks(tasks => {
                const activeTaskIndex = tasks.findIndex(t => t.id === activeId)
                const overTaskIndex = tasks.findIndex(t => t.id === overId)

                tasks[activeTaskIndex].columnId = tasks[overTaskIndex].columnId

                return arrayMove(tasks, activeTaskIndex, overTaskIndex)
            })
            return
        }

        const isOverColumn = over.data.current?.type === "Column"

        if (isActiveTask && isOverColumn) {
            setTasks(tasks => {
                const activeTaskIndex = tasks.findIndex(t => t.id === activeId)

                tasks[activeTaskIndex].columnId = overId

                return arrayMove(tasks, activeTaskIndex, activeTaskIndex)
            })
            return
        }
    }

    const columnsId = useMemo(() => columns.map(col => col.id), [columns])
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
                                    tasks={tasks.filter(t => t.columnId === col.id)}
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
                        {activeColumn && <ColumnContainer
                            column={activeColumn}
                            deleteColumn={deleteColumn}
                            createTask={createNewTask}
                            tasks={tasks.filter(t => t.columnId === activeColumn.id)}
                            deleteTask={deleteTask} />}
                        {
                            activeTask && <TaskCard task={activeTask} deleteTask={deleteTask} />
                        }
                    </DragOverlay>, document.body)
                }

            </DndContext>
        </div>
    );
}

export default KanbanBoard;