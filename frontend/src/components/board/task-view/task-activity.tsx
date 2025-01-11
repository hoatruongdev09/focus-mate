import { ListBulletIcon } from "@heroicons/react/16/solid"

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

export default TaskActivity