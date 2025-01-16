import { Task } from "../../../types/board-type";
import TaskHeader from "./task-header";
import TaskDescription from "./task-description";
import TaskActivity from "./task-activity";
import TaskFunctions from "./task-functions";
import TaskActions from "./task-actions";
import { XMarkIcon } from "@heroicons/react/16/solid";

interface Props {
    task: Task
    onCloseClick: () => void
}

function TaskView(props: Props) {

    const { task, onCloseClick } = props
    return (
        <div className="absolute left-7 right-7 lg:relative lg:w-[768px] lg:mx-auto h-full overflow-y-scroll py-12 z-50">
            <div className="w-full min-h-[830px] bg-gray-50 rounded-xl flex gap-5 p-4 relative">
                <button
                    className="p-1 m-1 hover:bg-slate-300 bg-opacity-25 rounded absolute right-3 top-3"
                    onClick={onCloseClick}
                >
                    <XMarkIcon className="size-6" />
                </button>

                <div className="flex flex-col flex-1 gap-5">
                    <TaskHeader />
                    <TaskDescription task={task} />
                    <TaskActivity />
                </div>

                <div className="w-44 flex flex-col pt-24 gap-3">
                    <TaskFunctions />
                    <TaskActions task={task} />
                </div>
            </div>
        </div>
    );
}

export default TaskView;