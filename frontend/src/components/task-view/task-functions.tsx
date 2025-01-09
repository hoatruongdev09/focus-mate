import { XMarkIcon } from "@heroicons/react/16/solid";
import { UserPlusIcon } from "@heroicons/react/24/outline";

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
export default TaskFunctions