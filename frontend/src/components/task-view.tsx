import { Bars3BottomLeftIcon, CheckIcon, ChevronDownIcon, EyeIcon, ListBulletIcon, XMarkIcon } from "@heroicons/react/16/solid";
import XIcon from "../Icon/x-icon";
import { UserPlusIcon } from "@heroicons/react/24/outline";
import { Task, UpdateTaskData } from "../types/board-type";
import { WindowIcon } from "@heroicons/react/24/outline";
import { useDispatch, useSelector } from "react-redux";
import { AppRootState } from "../store/store";
import { setViewingTask } from "../store/slices/board-slice";
import { useState } from "react";
import { useUpdateTaskMutation } from "../store/services/board-service";

interface Props {
    task: Task
    onCloseClick: () => void
}

const TaskHeader = ({ task }: { task: Task }) => {
    const dispatch = useDispatch()
    const [updateTask] = useUpdateTaskMutation()
    const { columns } = useSelector((state: AppRootState) => state.boardView)
    const [titleHeight, setTitleHeight] = useState(60)
    const taskColumn = columns.find(c => c.id === task.group_id)

    const onTitleChanged = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setViewingTask({
            ...task,
            title: e.target.value
        }))
    }
    const onOutOfFocusTitle = () => {
        updateTask({
            ...task
        })
    }

    return (
        <div className="flex gap-2">
            <div className="w-9 h-10 flex items-center justify-center">
                <WindowIcon className="size-6" />
            </div>
            <div className="flex flex-col flex-1">
                <textarea
                    className="p-1 font-semibold text-xl bg-gray-50 flex"
                    value={task.title}
                    onChange={(e) => onTitleChanged(e)}
                    onBlur={onOutOfFocusTitle}
                />
                <div className="flex flex-col ml-1">
                    <div className="h-8 flex items-center gap-1">
                        <p className="text-sm text-gray-700 pt-0">in list</p>
                        <div className="bg-slate-300 bg-opacity-25 px-1 py-0.5 text-xs flex 
                                        gap-1 items-center justify-center">
                            <p className="font-semibold text-gray-700">{taskColumn?.name}</p>
                            <button className="font-semibold text-gray-700">
                                <ChevronDownIcon className="size-5" />
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-col justify-center gap-1 mt-5">
                        <p className="font-semibold text-sm text-gray-500">Notification</p>
                        <div>
                            <button className="flex items-center gap-1 bg-slate-300 
                                        bg-opacity-25 py-1 px-2 justify-center rounded">
                                <EyeIcon className="size-4 text-gray-700" />
                                <p className="text-sm font-semibold text-gray-700">Watched</p>
                                <CheckIcon className="size-4 text-gray-700" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

const TaskDescription = ({ task }: { task: Task }) => {
    return (
        <div className="flex gap-2">
            <div className="h-10 w-10 flex items-center justify-center">
                <Bars3BottomLeftIcon className="size-6" />
            </div>
            <div className="flex flex-col flex-1 gap-1">
                <p className="font-semibold text-lg">Description</p>
                <textarea
                    className="bg-slate-300 bg-opacity-25 min-h-16 max-h-72 rounded p-2"
                    placeholder="Add a more detailed description..."
                    value={task.description}
                >

                </textarea>
            </div>
        </div>
    )
}

const TaskActivity = () => {

    const TaskComment = () => {
        return (
            <div className="flex gap-2">
                <div className="h-10 w-10 bg-orange-400 rounded-full">

                </div>
                <div className="flex flex-col gap-2 flex-1">
                    <p className="font-semibold">Time_sorcerer <span className="pl-1 font-light text-sm text-gray-700">just now</span></p>
                    <p className="bg-white border shadow-sm rounded-xl py-2 px-3 flex-1"
                    >
                        sdfsdf
                    </p>
                    <div className="flex gap-2 items-center ml-1">
                        <button className="bg-orange-400 w-4 h-4"></button>
                        <p className="font-light text-xs text-gray-700">•</p>
                        <button className="font-light text-xs text-gray-700">Edit</button>
                        <p className="font-light text-xs text-gray-700">•</p>
                        <button className="font-light text-xs text-gray-700">Delete</button>
                    </div>
                </div>
            </div>
        )
    }
    return (
        <div className="flex flex-col pt-2 gap-5">
            <div className="flex flex-col gap-3">
                <div className="flex gap-2 justify-between items-center">
                    <div className="flex flex-1 gap-2 items-center">
                        <div className="h-10 w-10 flex justify-center items-center">
                            <ListBulletIcon className="size-6" />
                        </div>
                        <p className="font-semibold text-lg">Activity</p>
                    </div>
                    <button className="bg-slate-300 bg-opacity-25 py-1 px-2 rounded">
                        <p className="">Hide detail</p>
                    </button>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="h-10 w-10 bg-orange-400 rounded-full"></div>
                    <input className="bg-white border shadow-sm rounded-xl px-3 py-2 flex-1"
                        placeholder="Write a comment..."
                    >
                    </input>
                </div>
            </div>

            <div className="flex flex-col gap-3">
                <TaskComment />
                <TaskComment />
                <TaskComment />
                <TaskComment />
                <TaskComment />
                <TaskComment />
            </div>
        </div>)
}


const TaskFunctions = () => {
    return (
        <div className="flex flex-col gap-1">
            <div className="flex flex-col gap-2">
                <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                    <UserPlusIcon className="size-4" />
                    <p>Join</p>
                </button>
                <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                    <XMarkIcon className="size-4" />
                    <p>Members</p>
                </button>
                <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                    <XMarkIcon className="size-4" />
                    <p>Labels</p>
                </button>
                <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                    <XMarkIcon className="size-4" />
                    <p>Cover</p>
                </button>
            </div>
        </div>
    )
}

const TaskActions = () => {
    return (<div className="flex flex-col gap-1">
        <p className="font-semibold text-sm">Actions</p>
        <div className="flex flex-col gap-2">
            <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                <XIcon className="size-4" viewBox="0 0 24 24" />
                <p>Move</p>
            </button>
            <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                <XIcon className="size-4" viewBox="0 0 24 24" />
                <p>Copy</p>
            </button>
            <div className="bg-slate-300 h-px"></div>
            <button className="flex items-center gap-2 bg-slate-300 bg-opacity-25 px-2 py-1 rounded">
                <XIcon className="size-4" viewBox="0 0 24 24" />
                <p>Archive</p>
            </button>
        </div>
    </div>)
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
                    <TaskHeader task={task} />
                    <TaskDescription task={task} />
                    <TaskActivity />
                </div>

                <div className="w-44 flex flex-col pt-24 gap-3">
                    <TaskFunctions />
                    <TaskActions />
                </div>
            </div>
        </div>
    );
}

export default TaskView;