import { useDispatch, useSelector } from "react-redux";
import Modal from "../modal";
import { setViewingTask } from "../../store/slices/board-slice";
import TaskView from "./task-view/task-view";
import { AppRootState } from "../../store/store";

function ModalViewTask() {
    const dispatch = useDispatch()
    const { viewingTask } = useSelector((state: AppRootState) => state.boardView)

    return (
        <Modal
            isShow={viewingTask != null}
            onBgClick={() => { dispatch(setViewingTask(null)) }}
        >
            {
                viewingTask &&
                <TaskView
                    task={viewingTask}
                    onCloseClick={() => dispatch(setViewingTask(null))}
                />
            }
        </Modal>
    );
}

export default ModalViewTask;