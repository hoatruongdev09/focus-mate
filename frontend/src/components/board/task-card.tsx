import { useCallback, useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Task } from "../../types/board-type";
import { DraggingItem } from "../../types/draging-item";
import { useDispatch } from "react-redux";
import { setViewingTask } from "../../store/slices/board-slice";
import { PencilIcon } from "@heroicons/react/16/solid";

interface Props {
    task: Task
}


function TaskCard(props: Props) {
    const dispatch = useDispatch()

    const { task } = props
    const [mouseIsOver, setMouseIsOver] = useState(false)
    const { setNodeRef, attributes, listeners, transform, transition, isDragging } = useSortable({
        id: `${DraggingItem.TASK}_${task.id}`,
        data: {
            type: DraggingItem.TASK,
            task
        },
    })

    const style = useMemo(() => ({
        transition,
        transform: CSS.Translate.toString(transform),
    }), [transition, transform]);

    const handleClick = useCallback(() => {
        dispatch(setViewingTask(task));
    }, [dispatch, task]);

    const handleMouseEnter = useCallback(() => {
        setMouseIsOver(true);
    }, []);

    const handleMouseLeave = useCallback(() => {
        setMouseIsOver(false);
    }, []);

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`border bg-mainBackgroundColor p-2 ${(isDragging ? "bg-rose-200" : "")}
                rounded-md hover:border-rose-500 hover:cursor-pointer relative`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >


            <div className={`flex w-full ${(isDragging ? "opacity-0" : "opacity-100")} justify-stretch transition-opacity duration-600`}>
                <p className="overflow-x-clip whitespace-pre-wrap align-middle flex-1">
                    {task.title}
                </p>
                <div className="w-5">
                    {
                        mouseIsOver
                        && <button
                            className="w-5 opacity-60 hover:opacity-100">
                            <PencilIcon className="size-4" />
                        </button>
                    }
                </div>
            </div>


        </div>
    );
}

export default TaskCard;