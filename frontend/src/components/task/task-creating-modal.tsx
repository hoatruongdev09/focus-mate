import CreateTaskView from "./create-task-view";
import Modal from "../modal";
import { useAddTaskMutation } from "../../services/tasks";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../store/store";
import { clearCreatingTask, clearSelectingColumns } from "../../store/slices/task-view-slice";


function TaskCreatingModal() {
    const dispatch = useDispatch()

    const state = useSelector((state: RootState) => ({
        column: state.taskView.selectingColumn,
        creatingTaskData: state.taskView.creatingTask
    }))


    const [addTask] = useAddTaskMutation()

    const onCreateTask = async () => {
        if (state.column == null) {
            return
        }
        await addTask({ columnId: state.column.id, data: { ...state.creatingTaskData } })
        onCancel()
    }

    const onCancel = () => {
        dispatch(clearCreatingTask())
        dispatch(clearSelectingColumns())
    }

    return (
        <Modal isOpen={state.column != null} onCancel={onCancel}>
            <div className="z-40 flex flex-col justify-stretch flex-1 p-10 bg-white fixed top-2 right-2 left-2 bottom-2 md:left-auto md:right-0 md:top-0 md:bottom-0 md:w-3/5">
                <CreateTaskView onSubmit={onCreateTask} />
            </div>
        </Modal>
    );
}

export default TaskCreatingModal;