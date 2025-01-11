import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useRef } from "react";
import { Group, Task } from "../../../types/board-type";
import { DraggingItem } from "../../../types/draging-item";
import ColumnTaskContainer from "./column-task-container";
import { TrashIcon } from "@heroicons/react/24/outline";
import NewTaskCreator from "./new-task-creator";

interface Props {
    isOverlay: boolean
    targetHeight?: number
    column: Group
    setRef?: (id: number, node: HTMLElement) => void
    tasks: Task[]
}



function ColumnContainer(props: Props) {
    const { column, tasks, isOverlay, setRef, targetHeight } = props

    const isRegisteredRef = useRef<boolean>(false)
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
            if (isRegisteredRef.current) { return }
            if (!node || !node.current || !setRef) { return }
            setRef(column.id, node.current)
            isRegisteredRef.current = true
            console.log('register')
        }, [node, column, setRef])
    }

    const style = {
        transition,
        transform: CSS.Translate.toString(transform),
    }

    const taskIds = useMemo(() => tasks.map(t => `${DraggingItem.TASK}_${t.id}`), [tasks])

    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="w-72 rounded-xl flex flex-col">
            </div>
        )
    }
    return (
        <div
            ref={setNodeRef}
            style={style}
            className={isOverlay ? `h-[${targetHeight}px]` : 'h-full'}
        >
            <div className="bg-white w-72 rounded-xl flex flex-col max-h-full">
                <div
                    {...attributes}
                    {...listeners}
                    className="bg-white text-md cursor-grab rounded-xl px-2 py-1 flex items-center justify-between">
                    <div className="flex gap-2 items-center justify-center">
                        <p className="bg-white px-2 py-1 rounded-full">{tasks.length}</p>
                        <p className="py-1">{column.name}</p>
                    </div>
                    <button className="rounded px-2 py-2 hover:bg-gray-200">
                        <TrashIcon className="size-4" />
                    </button>
                </div>

                <div className="flex flex-col flex-1 gap-2 p-2 overflow-x-hidden overflow-y-scroll">
                    <ColumnTaskContainer
                        tasks={tasks}
                        taskIds={taskIds}
                    />
                </div>

                <NewTaskCreator column={column} />
            </div>

        </div>
    );
}

export default ColumnContainer;