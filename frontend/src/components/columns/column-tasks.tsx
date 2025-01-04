import { useDispatch } from "react-redux"
import { ColumnData, TaskItem } from "../../types/board-type"
import { setSelectingTask } from "../../store/slices/task-view-slice"
import Task from "../task/task"

const ColumnTasks = ({ tasks, onScrollTrigger }: { column: ColumnData, tasks: TaskItem[] | undefined, onScrollTrigger: (e: React.UIEvent<HTMLDivElement, UIEvent>) => void }) => {
    const dispatch = useDispatch()

    const onItemSelect = (item: TaskItem) => {
        dispatch(setSelectingTask(item))
    }

    return (
        <div
            className="flex flex-col gap-2 items-stretch overflow-y-scroll no-scrollbar absolute left-0 top-0 right-0 bottom-0 px-2 pt-12 pb-2"
            onScroll={(e) => onScrollTrigger(e)}
        >
            {
                tasks && [...tasks].sort((a, b) => a.order_by - b.order_by).map(t => (
                    <Task key={`task-${t.id}`} onSelect={item => onItemSelect(item)} data={t} />
                ))
            }

        </div>
    )
}
export default ColumnTasks

