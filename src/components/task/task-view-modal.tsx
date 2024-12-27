import { ChangeEvent, useEffect, useState } from "react";
import { deleteTask, TaskItem, updateTask } from "../../store/slices/task-slices";
import Modal from "../modal";
import TaskView from "./task-view";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clear } from "../../store/slices/task-view-slice";

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
        dispatch(clear())
    }

    const onSave = () => {
        if (currentTask != null) {
            dispatch(updateTask(currentTask))
        }
        onCancel()
    }

    const onDelete = () => {
        if (currentTask != null) {
            dispatch(deleteTask(currentTask.id))
        }
        onCancel()
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
    const onFormPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (currentTask == null) { return }
        setCurrentTask({
            ...currentTask,
            [e.target.name]: e.target.value
        })
    }

    return (
        <Modal isOpen={currentTask != null} onCancel={onCancel}>
            <div id="taskView" className="z-40 flex flex-col justify-stretch flex-1 p-5 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-2/5">
                {
                    currentTask && <TaskView
                        formState={currentTask}
                        onFormDataChange={onFormDataChange}
                        onFormTextAreaChange={onFormTextAreaChange}
                        onFormPriorityChange={onFormPriorityChange}
                    />}

                <div className="flex flex-row-reverse gap-2">
                    <button className="bg-green-500 w-24 px-3 py-1" onClick={(e => onSave())}>Save</button>
                    <button className="bg-red-500  w-24 px-3 py-1" onClick={e => onDelete()}>Delete</button>
                    <button className="bg-red-500  w-24 px-3 py-1" onClick={e => onCancel()}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export default TaskViewModal;