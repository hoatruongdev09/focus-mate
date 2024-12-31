import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearSelectingTask } from "../../store/slices/task-view-slice";
import UpdateTaskView from "./update-task-view";
import { TaskItem } from "../../types/board-type";
import { useUpdateTaskMutation } from "../../services/tasks";

export interface TaskViewProps {
    taskItem?: TaskItem | null
    setCurrentTaskItem: (item: TaskItem | null) => void
}

function TaskViewModal() {

    const dispatch = useDispatch()
    const [updateTask] = useUpdateTaskMutation()

    const task = useSelector((state: RootState) => state.taskView.selectingTask)

    const onCancel = async () => {
        if (task == null) { return }
        const { title, description, estimate, priority, group } = task
        await updateTask({
            taskId: task.id, data: {
                title, description, estimate, priority,
                column_id: group.id
            }
        })
        dispatch(clearSelectingTask())
    }
    const isOpen = task != null
    return (
        <Modal isOpen={isOpen} onCancel={onCancel}>
            <div className="z-40 flex flex-col justify-stretch flex-1 p-5 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-3/5" >
                {
                    isOpen && <UpdateTaskView task={task} />
                }
            </div>
        </Modal >
    );
}

export default TaskViewModal;