import { ChangeEvent, useState } from "react";
import { CreateTaskData, TaskItem } from "../../store/slices/task-slices";
import Modal from "../modal";
import TaskView from "./task-view";

export interface TaskViewProps {
    taskItem?: TaskItem | null
    setCurrentTaskItem: (item: TaskItem | null) => void
}

function TaskViewModal({ taskItem, setCurrentTaskItem }: TaskViewProps) {
    const [formState, setFormState] = useState<CreateTaskData | null>(taskItem != null ? { ...taskItem } : null)

    const onCancel = () => {
        setCurrentTaskItem(null)
    }

    const onSave = () => {
        onCancel()
    }

    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        // setFormState({
        //     ...formState,
        //     [e.target.name]: e.target.value
        // })
    }
    const onFormTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        // setFormState({
        //     ...formState,
        //     [e.target.name]: e.target.value
        // })
    }
    const onFormPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        // setFormState({
        //     ...formState,
        //     [e.target.name]: e.target.value
        // })
    }

    return (
        <Modal isOpen={taskItem != null} onCancel={onCancel}>
            <div id="taskView" className="z-40 flex flex-col justify-stretch flex-1 p-5 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-2/5">
                {
                    formState && <TaskView
                        formState={formState}
                        onFormDataChange={onFormDataChange}
                        onFormTextAreaChange={onFormTextAreaChange}
                        onFormPriorityChange={onFormPriorityChange}
                    />}

                <div className="flex flex-row-reverse gap-2">
                    <button className="bg-green-500 w-24 px-3 py-1" onClick={(e => onSave())}>Save</button>
                    <button className="bg-red-500  w-24 px-3 py-1" onClick={e => onCancel()}>Cancel</button>
                </div>
            </div>
        </Modal>
    );
}

export default TaskViewModal;