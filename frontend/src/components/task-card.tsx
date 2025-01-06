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
            className={`border bg-mainBackgroundColor p-2 ${(isDragging ? "bg-rose-200" : "")}
                rounded-md hover:border-rose-500 hover:cursor-pointer relative`}
            onMouseEnter={() => setMouseIsOver(true)}
            onMouseLeave={() => setMouseIsOver(false)}
        >


            <div className={`flex w-full ${(isDragging ? "opacity-0" : "opacity-100")} justify-stretch transition-opacity duration-600`}>
                <p className="overflow-x-clip whitespace-pre-wrap align-middle flex-1">
                    {task.title}
                </p>
                <div className="w-5">
                    {
                        mouseIsOver
                        && <button
                            onClick={() => deleteTask(task.id)}
                            className="stroke-black w-5 opacity-60 hover:opacity-100">
                            <TrashIcon className="size-5" />
                        </button>
                    }
                </div>
            </div>


        </div>
    );
}

export default TaskCard;