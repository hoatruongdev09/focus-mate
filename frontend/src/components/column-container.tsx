import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../Icon/trash-icon";
import { Column, Id, Task } from "../types";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../Icon/plus-icon";
import TaskCard from "./task-card";
import { useMemo } from "react";

interface Props {
    column: Column
    tasks: Task[]
    deleteColumn: (id: Id) => void
    createTask: (id: Id) => void
    deleteTask: (id: Id) => void
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, createTask, tasks, deleteTask } = props
    const taskIds = useMemo(() => tasks.map(task => task.id), [tasks])

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: column.id,
        data: {
            type: "Column",
            column
        }
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    if (isDragging) {
        return <div ref={setNodeRef}
            style={style}
            className="bg-columnBackgroundColor opacity-60 border border-rose-500 w-[350px] 
            min-h-[500px] h-full rounded-md flex flex-col">

        </div>
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-columnBackgroundColor w-[350px] min-h-[500px] h-full rounded-md flex flex-col">

            <div
                {...attributes}
                {...listeners}
                className="
                    bg-mainBackgroundColor text-md
                    cursor-grab rounded-md rounded-b-none px-3 py-1
                    border-columnBackgroundColor border-4 flex items-center justify-between">
                <div className="flex gap-2 items-center">
                    <p className="bg-columnBackgroundColor px-2 py-1 text-sm rounded-full">0</p>
                    <p>{column.title}</p>
                </div>
                <button className="
                    stroke-gray-500 hover:stroke-white 
                    hover:bg-columnBackgroundColor rounded px-1 py-2"
                    onClick={() => deleteColumn(column.id)}
                >
                    <TrashIcon />

                </button>
            </div>
            <div className="flex flex-col flex-1 gap-2 p-2 overflow-x-hidden overflow-y-scroll">
                <SortableContext items={taskIds} >
                    {tasks.map(t => (
                        <TaskCard key={`task-${t.id}`} task={t} deleteTask={deleteTask} />
                    ))}
                </SortableContext>
            </div>
            <button className="flex gap-2 items-center 
                border-columnBackgroundColor border-2 rounded-md p-4
                border-x-columnBackgroundColor
                hover:bg-mainBackgroundColor
                hover:text-rose-500
                active:bg-black"
                onClick={() => createTask(column.id)}
            ><PlusIcon /> Add Task</button>
        </div>
    );
}

export default ColumnContainer;