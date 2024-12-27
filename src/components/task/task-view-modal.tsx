import { ChangeEvent, useEffect, useState } from "react";
import { TaskItem, updateTask } from "../../store/slices/task-slices";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clear } from "../../store/slices/task-view-slice";
import UpdateTaskView from "./update-task-view";

export interface TaskViewProps {
    taskItem?: TaskItem | null
    setCurrentTaskItem: (item: TaskItem | null) => void
}

function TaskViewModal() {
    const dispatch = useDispatch()
    const selectingTask = useSelector((state: RootState) => state.taskView.selectingTask)
    const [currentTask, setCurrentTask] = useState<TaskItem | null>(null)

    useEffect(() => {
        setCurrentTask(selectingTask)
    }, [selectingTask])

    const onCancel = () => {
        if (currentTask != null) {
            dispatch(updateTask(currentTask))
        }
        dispatch(clear())
    }


    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (currentTask == null) { return }
        setCurrentTask({
            ...currentTask,
            [e.target.name]: e.target.value
        })
    }
    const onFormTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (currentTask == null) { return }
        setCurrentTask({
            ...currentTask,
            [e.target.name]: e.target.value
        })
    }
    const onFormOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (currentTask == null) { return }
        console.log(`${e.target.name} ${e.target.value}`)
        setCurrentTask({
            ...currentTask,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Modal isOpen={currentTask != null} onCancel={onCancel}>
            <div
                id="taskView"
                className="z-40 flex flex-col justify-stretch flex-1 p-5 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-3/5"
            >
                {
                    currentTask && <UpdateTaskView
                        taskState={currentTask}
                        onFormDataChange={onFormDataChange}
                        onFormTextAreaChange={onFormTextAreaChange}
                        onFormOptionChange={onFormOptionChange}
                    />}
            </div>
        </Modal>
    );
}

export default TaskViewModal;