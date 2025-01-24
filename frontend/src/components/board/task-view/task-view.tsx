import { CoverType, Task } from "../../../types/board-type";
import TaskHeader from "./task-header";
import TaskDescription from "./task-description";
import TaskActivity from "./task-activity";
import TaskFunctions from "./task-functions";
import TaskActions from "./task-actions";
import { PhotoIcon, XMarkIcon } from "@heroicons/react/16/solid";

interface Props {
    task: Task
    onCloseClick: () => void
}

function TaskView(props: Props) {

    const { task, onCloseClick } = props

    const isUseCover = task.cover_type != CoverType.None

    return (
        <div className="absolute left-7 right-7 lg:relative lg:w-[768px] lg:mx-auto h-full overflow-y-scroll py-12 z-20">
            <div
                style={{
                    backgroundColor: task.cover_type == CoverType.SolidColor ? task.cover_value : '',
                    backgroundImage: task.cover_type == CoverType.Gradient ? task.cover_value : ''
                }}
                className={`w-full min-h-[830px] ${!isUseCover ? "bg-gray-50" : ""} rounded-xl flex flex-col gap-1 relative`}
            >
                <div className="flex items-center">
                    <button
                        className="p-1 hover:bg-white hover:bg-opacity-25 rounded absolute right-3 top-3"
                        onClick={onCloseClick}
                    >
                        <XMarkIcon className="size-6" />
                    </button>
                    <button className="flex items-center font-semibold text-sm gap-1 opacity-90 absolute right-3 top-16 p-1 hover:bg-white hover:bg-opacity-25 rounded">
                        <PhotoIcon className="size-4" />
                        Cover
                    </button>
                </div>
                <div className={`p-4 ${isUseCover ? "mt-24" : "rounded-t-xl"} bg-gray-50 rounded-b-xl`}>
                    <div className="flex gap-5 flex-1">

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
            </div>
        </div>
    );
}

export default TaskView;