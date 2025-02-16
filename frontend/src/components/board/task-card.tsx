import { useCallback, useMemo, useState } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { CoverType, Card, CardLayoutType } from "../../types/board.type";
import { DraggingItem } from "../../types/draging-item.type";
import { useDispatch } from "react-redux";
import { setViewingTask } from "../../store/slices/board-slice";
import { PencilIcon } from "@heroicons/react/16/solid";

interface Props {
    task: Card
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

    const hasCover = useMemo(() => task.cover_type != CoverType.None, [task.cover_type])

    return (
        <div
            ref={setNodeRef}
            style={{
                ...style,
                backgroundColor: isDragging ? "#fecdd3" : (hasCover && task.layout_type == CardLayoutType.Large ? task.cover_value : "#f4f4f5"),
            }}
            {...attributes}
            {...listeners}
            className={`rounded-md hover:cursor-pointer relative shadow-sm`}
            onClick={handleClick}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {
                hasCover && task.layout_type == CardLayoutType.Large && <div className="h-10" />
            }
            {
                hasCover && task.layout_type == CardLayoutType.Normal && <div
                    style={{
                        backgroundColor: !isDragging ? task.cover_value : "transparent",
                    }}
                    className="h-10 rounded-t-md" />
            }
            <div
                className={`flex w-full ${(isDragging ? "opacity-0" : "opacity-100")} justify-stretch transition-opacity duration-600  p-2`}
            >
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