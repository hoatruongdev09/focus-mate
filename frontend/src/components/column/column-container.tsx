import { SortableContext, useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo } from "react";
import { Group, Task } from "../../types/board-type";
import { DraggingItem } from "../../types/draging-item";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import ColumnTaskContainer from "./column-task-container";
import { TrashIcon } from "@heroicons/react/24/outline";
import NewTaskCreator from "./new-task-creator";

interface Props {
    isOverlay: boolean
    targetHeight: number
    column: Group
    tasks: Task[]
    deleteColumn: (id: number) => void
    setRef: (id: number, node: HTMLElement) => void
}

function ColumnContainer(props: Props) {
    const { column, deleteColumn, isOverlay, tasks, setRef, targetHeight } = props


    const {
        setNodeRef,
        attributes,
        listeners,
        transform,
        transition,
        isDragging,
        node
    } = useSortable({
        id: `${DraggingItem.COLUMN}_${column.id}`,
        data: {
            type: DraggingItem.COLUMN,
            column
        }
    })

    if (!isOverlay) {
        useEffect(() => {
            if (!node || !node.current) { return }
            setRef(column.id, node.current)
        }, [node, column])
    }

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
                className="bg-gray-400 w-72 h-full rounded-xl flex flex-col">
            </div>
        )
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            className={`bg-white w-72 rounded-xl flex flex-col ${(isOverlay ? `h-[${targetHeight}px]` : 'max-h-full')}`}
        >
            <div
                {...attributes}
                {...listeners}
                className="bg-white text-md cursor-grab rounded-xl px-2 py-1 flex items-center justify-between">
                <div className="flex gap-2 items-center justify-center">
                    <p className="bg-white px-2 py-1 rounded-full">{tasks.length}</p>
                    <p className="py-1">{column.name}</p>
                </div>
                <button className="rounded px-2 py-2 hover:bg-gray-200"
                    onClick={() => deleteColumn(column.id)}
                >
                    <TrashIcon className="size-4" />

                </button>
            </div>

            <div className="flex flex-col flex-1 gap-2 p-2 overflow-x-hidden overflow-y-scroll">
                <SortableContext items={taskIds} >
                    <ColumnTaskContainer tasks={tasks} />
                </SortableContext>
            </div>

            <NewTaskCreator column={column} />
        </div>
    );
}

export default ColumnContainer;