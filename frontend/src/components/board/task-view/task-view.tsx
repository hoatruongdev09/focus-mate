import { CoverType, Task } from "../../../types/board-type";
import TaskHeader from "./task-header";
import TaskDescription from "./task-description";
import TaskActivity from "./task-activity";
import TaskFunctions from "./task-functions";
import TaskActions from "./task-actions";
import ButtonXClose from "../../commons/button-x-close";
import { ArchiveBoxIcon } from "@heroicons/react/24/solid";

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
                className={`w-full min-h-[830px] ${!isUseCover ? "bg-gray-50" : ""} rounded-xl flex flex-col relative`}
            >

                <div className={`absolute top-0 left-0 right-0 rounded-t-xl ${task.archived ? "h-14 bg-[repeating-linear-gradient(-45deg,#f9f3d7_0px,#f9f3d7_10px,rgba(255,255,255,1)_10px,rgba(255,255,255,1)_20px)]" : ""}`}>
                    {
                        task.archived && <div
                            className="w-full h-full flex gap-4 items-center "
                        >
                            <ArchiveBoxIcon className="size-5 ml-4 text-zinc-700" />
                            <p className="text-zinc-700">This card is archived</p>
                        </div>
                    }
                </div>
                <div className="flex items-center">
                    <ButtonXClose
                        buttonClassName="absolute right-3 top-3"
                        onClick={onCloseClick}
                    />
                    {/* <button className="flex items-center font-semibold text-sm gap-1 opacity-90 absolute right-3 top-16 p-1 hover:bg-white hover:bg-opacity-25 rounded">
                        <PhotoIcon className="size-4" />
                        Cover
                    </button> */}
                </div>
                <div className={`p-4 bg-gray-50 rounded-b-xl flex-1 ${(task.archived || isUseCover) ? "" : "rounded-t-xl"} mt-28`}>
                    <div className="flex gap-5 flex-1">
                        <div className="flex flex-col flex-1 gap-5">
                            <TaskHeader />
                            <TaskDescription task={task} />
                            <TaskActivity task={task} />
                        </div>

                        <div className="w-44 flex flex-col pt-10 gap-3">
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