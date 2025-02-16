import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useEffect, useMemo, useRef } from "react";
import { List, Card } from "../../../types/board.type";
import { DraggingItem } from "../../../types/draging-item.type";
import ColumnTaskContainer from "./column-task-container";
import NewTaskCreator from "./new-task-creator";
import ColumnHeader from "./column-header";

interface Props {
    isOverlay?: boolean
    targetHeight?: number
    column: List
    setRef?: (id: number, node: HTMLElement) => void
    tasks: Card[]
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

    useEffect(() => {
        if (!isOverlay && !isRegisteredRef.current && node.current && setRef) {
            setRef(column.id, node.current);
            isRegisteredRef.current = true;
            console.log('register');
        }
    }, [isOverlay, column.id, setRef]);

    const style = useMemo(() => ({
        transition,
        transform: CSS.Translate.toString(transform),
    }), [transition, transform])

    const taskIds = useMemo(() => tasks.map(t => `${DraggingItem.TASK}_${t.id}`), [tasks])
    if (isDragging) {
        return (
            <div
                ref={setNodeRef}
                style={style}
                className="w-72 rounded-xl flex flex-col h-full">
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
                    {...listeners}>
                    <ColumnHeader
                        column={column}
                        taskCount={taskIds.length}
                    />
                </div>

                <div className="flex flex-col flex-1 gap-2 px-2 overflow-x-hidden overflow-y-scroll py-2">
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