import { useSelector } from "react-redux";
import Task from "./task";
import { RootState } from "../../store/store";
import TaskCreatingModal from "./task-creating-modal";
import { useState } from "react";
import TaskViewModal from "./task-view-modal";
import { TaskItem } from "../../store/slices/task-slices";

function TaskHolder() {
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const [isShowCreateTask, setIsShowCreateTask] = useState<boolean>(false)


    const [selectingTaskItem, setSelectingTaskItem] = useState<TaskItem | null>(null)

    const onItemSelect = (item: TaskItem) => {
        setSelectingTaskItem(item)
    }

    return (
        <>
            <div className="flex flex-col w-full h-full gap-2 lg:w-[55%] overflow-y-scroll no-scrollbar">
                <div className="w-full px-5 h-14 bg-gray-700 flex justify-between items-center rounded-md shrink-0">
                    <div className="flex gap-2 items-center">
                        <p className="font-bold text-xl text-gray-200">Tasks</p>
                        <p className="font-bold text-l text-gray-200">10/20</p>
                    </div>
                    <button
                        className="bg-blue-500 font-bold text-gray-200 px-5 py-1 rounded-md"
                        onClick={() => setIsShowCreateTask(true)}
                    >Add</button>
                </div>
                <div className="w-full h-full flex flex-col gap-2">
                    {
                        [...tasks].sort((a, b) => b.createDate - a.createDate).map(t => (
                            <Task onSelect={item => onItemSelect(item)} key={t.id} data={t} />
                        ))
                    }

                </div>
            </div>
            <TaskCreatingModal
                isOpen={isShowCreateTask}
                setIsOpen={setIsShowCreateTask}
            />
            <TaskViewModal
                taskItem={selectingTaskItem}
                setCurrentTaskItem={setSelectingTaskItem}
            />
        </>
    );
}

export default TaskHolder;