import { ChangeEvent } from "react";
import { TaskItem, updateTask } from "../../store/slices/task-slices";
import Modal from "../modal";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clear, setSelectingTask } from "../../store/slices/task-view-slice";
import UpdateTaskView from "./update-task-view";

export interface TaskViewProps {
    taskItem?: TaskItem | null
    setCurrentTaskItem: (item: TaskItem | null) => void
}

function TaskViewModal() {
    const dispatch = useDispatch()

    const state = useSelector((state: RootState) => {
        return {
            selectingTask: state.taskView.selectingTask,
            columns: state.columns.columns
        }
    })

    const onCancel = () => {
        if (state.selectingTask == null) { return }
        dispatch(updateTask(state.selectingTask))
        dispatch(clear())
    }


    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        if (state.selectingTask == null) { return }
        dispatch(setSelectingTask({
            ...state.selectingTask,
            [e.target.name]: e.target.value
        }))
    }
    const onFormTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        if (state.selectingTask == null) { return }
        dispatch(setSelectingTask({
            ...state.selectingTask,
            [e.target.name]: e.target.value
        }))
    }
    const onFormOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        if (state.selectingTask == null) { return }
        dispatch(setSelectingTask({
            ...state.selectingTask,
            [e.target.name]: e.target.value
        }))
    }

    return (
        <Modal isOpen={state.selectingTask != null} onCancel={onCancel}>
            <div
                id="taskView"
                className="z-40 flex flex-col justify-stretch flex-1 p-5 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-3/5"
            >
                {
                    state.selectingTask && <UpdateTaskView
                        columns={state.columns}
                        taskState={state.selectingTask}
                        onFormDataChange={onFormDataChange}
                        onFormTextAreaChange={onFormTextAreaChange}
                        onFormOptionChange={onFormOptionChange}
                    />
                }
            </div>
        </Modal>
    );
}

export default TaskViewModal;