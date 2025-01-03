import { useDispatch } from "react-redux"
import { ColumnData, TaskItem } from "../../types/board-type"
import { setSelectingTask } from "../../store/slices/task-view-slice"
import Task from "../task/task"
import { DropTargetMonitor, useDrop } from "react-dnd"
import { ItemTypes } from "../../types/const"
import { useUpdateTaskMutation } from "../../services/tasks"

const ColumnTasks = ({ column, tasks, onScrollTrigger }: { column: ColumnData, tasks: TaskItem[] | undefined, onScrollTrigger: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void }) => {
    const dispatch = useDispatch()
    const [updateTask] = useUpdateTaskMutation()

    const onItemSelect = (item: TaskItem) => {
        dispatch(setSelectingTask(item))
    }

    const changeColumn = async (item: TaskItem, monitor: DropTargetMonitor<unknown, unknown>): Promise<void> => {
        const { id, title, description, estimate, priority, } = item
        await updateTask({
            taskId: id, data: {
                title, description, estimate, priority,
                column_id: column.id
            }
        })
    }
    const canChangeColumn = (item: TaskItem, monitor: DropTargetMonitor<unknown, unknown>): boolean => {
        return item.group.id !== column.id
    }
    const [{ isOver }, drop] = useDrop(() => ({
        accept: ItemTypes.TASK,
        drop: (item: TaskItem, monitor) => changeColumn(item, monitor),
        canDrop: (item: TaskItem, monitor) => canChangeColumn(item, monitor),
        collect: monitor => ({
            isOver: !!monitor.isOver,
            canDrop: !!monitor.canDrop
        })
    }))

    return (
        <div
            ref={drop}
            className="flex flex-col gap-2 items-stretch overflow-y-scroll no-scrollbar absolute left-0 top-0 right-0 bottom-0 px-2 pt-12 pb-2"
            onScroll={(e) => onScrollTrigger(e)}
        >
            {
                tasks && tasks.map(t => (
                    <Task key={`task-${t.id}`} onSelect={item => onItemSelect(item)} data={t} />
                ))
            }

        </div>
    )
}
export default ColumnTasks

