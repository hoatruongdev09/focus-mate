import { SortableContext, useSortable, verticalListSortingStrategy } from "@dnd-kit/sortable";
import TrashIcon from "../Icon/trash-icon";
import { CSS } from "@dnd-kit/utilities";
import PlusIcon from "../Icon/plus-icon";
import TaskCard from "./task-card";
import { useMemo } from "react";
import { Group, Task } from "../types/board-type";
import { DraggingItem } from "../types/draging-item";

interface Props {
    column: Group
    tasks: Task[]
    deleteColumn: (id: number) => void
    createTask: (id: number) => void
    deleteTask: (id: number) => void
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, createTask, tasks, deleteTask } = props
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `${DraggingItem.COLUMN}_${column.id}`,
        data: {
            type: DraggingItem.COLUMN,
            column
        }
    })

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }
    const taskIds = useMemo(() => tasks.map(task => `${DraggingItem.TASK}_${task.id}`), [tasks])

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="opacity-0 w-[350px] 
                        min-h-[500px] h-full">

            </div>
        )
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-columnBackgroundColor w-[350px] min-h-[500px] h-full rounded-md flex flex-col"
        >
            <div
                {...attributes}
                {...listeners}
                className="
                    bg-mainBackgroundColor text-md
                    cursor-grab rounded-md rounded-b-none px-3 py-1
                    border-columnBackgroundColor border-4 flex items-center justify-between">
                <div className="flex gap-2 items-center justify-center">
                    <p className="bg-columnBackgroundColor px-2 py-1 rounded-full">{tasks.length}</p>
                    <p className="py-1">{column.name}</p>
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