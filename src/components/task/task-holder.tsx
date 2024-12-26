import Task from "./task";

function TaskHolder() {
    return (
        <div className="flex flex-col w-full h-full gap-2 lg:w-[55%] overflow-y-scroll no-scrollbar">
            <div className="w-full px-5 h-14 bg-gray-700 flex justify-between items-center rounded-md shrink-0">
                <div className="flex gap-2 items-center">
                    <p className="font-bold text-xl text-gray-200">Tasks</p>
                    <p className="font-bold text-l text-gray-200">10/20</p>
                </div>
                <button className="bg-blue-500 font-bold text-gray-200 px-5 py-1 rounded-md">Add</button>
            </div>
            <div className="w-full h-full flex flex-col gap-2">
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />
                <Task />

            </div>
        </div>
    );
}

export default TaskHolder;