import { SortableContext, useSortable } from "@dnd-kit/sortable";
import TrashIcon from "../Icon/trash-icon";
import { CSS } from "@dnd-kit/utilities";
import TaskCard from "./task-card";
import { createRef, forwardRef, useEffect, useMemo, useRef, useState } from "react";
import { Group, Task } from "../types/board-type";
import { DraggingItem } from "../types/draging-item";
import { PlusSmallIcon } from "@heroicons/react/24/solid";
import NewTaskInput from "./new-task-input";

interface Props {
    column: Group
    tasks: Task[]
    deleteColumn: (id: number) => void
    createTask: (group_id: number, title: string) => void
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


    const inputCreateTaskRef = createRef<HTMLTextAreaElement>()
    const [taskInputState, setTaskInputState] = useState<{ value: string, visible: boolean }>({
        value: '',
        visible: false
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
                className="opacity-0 w-[350px] max-h-full rounded-md flex flex-col">

            </div>
        )
    }


    useEffect(() => {
        if (!taskInputState.visible || !inputCreateTaskRef) { return }
        inputCreateTaskRef.current?.scrollIntoView({ behavior: "instant" })
        inputCreateTaskRef.current?.focus()

    }, [taskInputState.visible, inputCreateTaskRef.current, tasks])

    const showTaskInput = () => {
        if (taskInputState.visible) { return }
        setTaskInputState({
            ...taskInputState,
            visible: true
        })
    }
    const onTaskInputHide = async () => {
        const { value } = taskInputState
        setTaskInputState({
            value: '',
            visible: false
        })
        if (value) {
            await createTask(column.id, value)
        }
    }

    const onTaskInputChange = (str: string) => {
        setTaskInputState({
            ...taskInputState,
            value: str
        })
    }

    return (
        <div
            ref={setNodeRef}
            style={style}
            className="bg-columnBackgroundColor w-72 max-h-full rounded-xl flex flex-col"
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
                    <TrashIcon className="size-5" />

                </button>
            </div>
            <div className="flex flex-col flex-1 gap-2 p-2 overflow-x-hidden overflow-y-scroll">
                <SortableContext items={taskIds} >
                    {tasks.map(t => (
                        <TaskCard key={`task-${t.id}`} task={t} deleteTask={deleteTask} />
                    ))}
                    <div
                        className={taskInputState.visible ? "block" : "hidden"}
                    >
                        <NewTaskInput
                            outOfFocus={onTaskInputHide}
                            visible={taskInputState.visible}
                            value={taskInputState.value}
                            inputRef={inputCreateTaskRef}
                            onChange={onTaskInputChange}
                        />
                    </div>
                </SortableContext>
            </div>
            <div className="p-2 w-full flex">
                <button
                    className="flex flex-1 gap-2 items-center 
                    rounded px-[8px] py-[6px] hover:bg-gray-100"
                    onClick={showTaskInput}
                >
                    <PlusSmallIcon className="size-6" />
                    Add a card
                </button>
            </div>
        </div>
    );
}

export default ColumnContainer;