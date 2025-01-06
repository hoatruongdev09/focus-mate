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
        transform: CSS.Translate.toString(transform),
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`border bg-mainBackgroundColor p-2 min-h-[50px] ${(isDragging ? "bg-rose-200" : "")}
                rounded-md hover:border-rose-500 cursor-grab relative`}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >
            {
                mouseIsOver
                && <button
                    onClick={() => deleteTask(task.id)}
                    className="stroke-black opacity-60 hover:opacity-100 absolute right-2">
                    <TrashIcon />
                </button>
            }

            <div className={`flex flex-col w-full h-full ${(isDragging ? "opacity-0" : "opacity-100")} transition-opacity duration-600`}>
                <p className="overflow-x-clip whitespace-pre-wrap align-middle flex-shrink-0">
                    {task.title}
                </p>
                <p className="overflow-y-hidden whitespace-pre-wrap align-middle flex-grow-1">
                    {task.description}
                </p>
            </div>


        </div>
    );
}

export default TaskCard;