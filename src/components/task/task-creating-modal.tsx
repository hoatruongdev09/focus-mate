import { ChangeEvent, useState } from "react";
import { addTask, CreateTaskData } from "../../store/slices/task-slices";
import { useDispatch } from "react-redux";
import TaskView from "./task-view";


function TaskCreatingModal({ isOpen, setIsOpen }:
    { isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

    const dispatch = useDispatch()

    const [formState, setFormState] = useState<CreateTaskData>({
        title: "",
        description: "",
        estimate: 1,
        priority: 0
    })

    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const onFormTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }
    const onFormPriorityChange = (e: ChangeEvent<HTMLSelectElement>) => {
        setFormState({
            ...formState,
            [e.target.name]: e.target.value
        })
    }

    const onCreateTask = () => {
        dispatch(addTask(formState))
        onCancel()
    }

    const onCancel = () => {
        setFormState({
            title: "",
            description: "",
            estimate: 1,
            priority: 0
        })
        setIsOpen(false)
    }

    return (
        <div className={`fixed left-0 top-0 right-0 bottom-0 bg-slate-900 bg-opacity-35 z-20 ${isOpen ? "block" : "hidden"}`}>
            <button
                className="fixed left-0 top-0 right-0 bottom-0 z-30 cursor-default "
                onClick={e => onCancel()}
            ></button>
            <div className="z-40 flex flex-col justify-stretch flex-1 p-5 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-2/5">
                <TaskView
                    formState={formState}
                    onFormDataChange={onFormDataChange}
                    onFormTextAreaChange={onFormTextAreaChange}
                    onFormPriorityChange={onFormPriorityChange}
                />

                <div className="flex flex-row-reverse gap-2">
                    <button className="bg-green-500 w-24 px-3 py-1" onClick={(e => onCreateTask())}>Add</button>
                    <button className="bg-red-500  w-24 px-3 py-1" onClick={e => onCancel()}>Cancel</button>
                </div>
            </div>
        </div>
    );
}

export default TaskCreatingModal;