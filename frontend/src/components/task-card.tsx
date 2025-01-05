import { useState } from "react";
import TrashIcon from "../Icon/trash-icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../types/board-type";
import { DraggingItem } from "../types/draging-item";

interface Props {
    task: Task
    deleteTask: (id: number) => void
}

function TaskCard(props: Props) {
    const { task, deleteTask } = props
    const [mouseIsOver, setMouseIsOver] = useState(false)

    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `${DraggingItem.TASK}_${task.id}`,
        data: {
            type: DraggingItem.TASK,
            task
        },
    })

    const style = {
        transition,
        transform: CSS.Transform.toString(transform),
    }
    if (isDragging) {
        return <div
            ref={setNodeRef}
            style={style}
            className="
                p-2.5 
                h-[50px] min-h-[50px] 
                items-center flex text-left rounded-md justify-between
                ring-2 ring-inset ring-rose-500
                cursor-grab opacity-60 bg-rose-200"></div>
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className="
                    ring-2
                    ring-gray-900
                    bg-mainBackgroundColor p-2.5 
                    h-[50px] min-h-[50px] 
                    items-center flex text-left rounded-md justify-between
                    hover:ring-2 hover:ring-inset hover:ring-rose-500 
                    cursor-grab"
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            <p className="my-auto w-full overflow-y-auto overflow-x-hidden whitespace-pre-wrap align-middle">
                {task.title} {task.id} {task.rank}
            </p>
            {mouseIsOver && <button
                onClick={() => deleteTask(task.id)}
                className="stroke-black p-2 opacity-60 hover:opacity-100">
                <TrashIcon />
            </button>}
        </div>
    );
}

export default TaskCard;