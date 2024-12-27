import { ChangeEvent, useState } from "react";
import { addTask, CreateTaskData } from "../../store/slices/task-slices";
import { useDispatch } from "react-redux";
import CreateTaskView from "./create-task-view";
import Modal from "../modal";


function TaskCreatingModal({ category, isOpen, setIsOpen }:
    { category: string, isOpen: boolean, setIsOpen: (isOpen: boolean) => void }) {

    const dispatch = useDispatch()

    const [formState, setFormState] = useState<CreateTaskData>({
        title: "",
        description: "",
        estimate: 1,
        priority: 0,
        category: ""
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
        const createTaskData = {
            ...formState,
            category
        }
        dispatch(addTask(createTaskData))
        onCancel()
    }

    const onCancel = () => {
        setFormState({
            title: "",
            description: "",
            estimate: 1,
            priority: 0,
            category: ""
        })
        setIsOpen(false)
    }

    return (
        <Modal isOpen={isOpen} onCancel={onCancel}>
            <div className="z-40 flex flex-col justify-stretch flex-1 p-10 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-3/5">
                <CreateTaskView
                    formState={formState}
                    onFormDataChange={onFormDataChange}
                    onFormTextAreaChange={onFormTextAreaChange}
                    onFormPriorityChange={onFormPriorityChange}
                    onSubmit={onCreateTask}
                />
            </div>
        </Modal>
    );
}

export default TaskCreatingModal;