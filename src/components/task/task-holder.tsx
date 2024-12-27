import { useDispatch, useSelector } from "react-redux";
import Task from "./task";
import { RootState } from "../../store/store";
import { TaskItem } from "../../store/slices/task-slices";
import { setSelectingTask } from "../../store/slices/task-view-slice";
import { useRef, useState } from "react";

function TaskHolder({ category, openCreateTask }: { category: string, openCreateTask: (category: string) => void }) {
    const dispatch = useDispatch()
    const tasks = useSelector((state: RootState) => state.tasks.tasks)
    const [scrolled, setScrolled] = useState(false)

    const filteredTasks = tasks.filter(t => t.category === category)

    const onItemSelect = (item: TaskItem) => {
        dispatch(setSelectingTask(item))
    }


    function onScrollTrigger(event: React.UIEvent<HTMLDivElement>): void {
        const offset = event.currentTarget.scrollTop;
        setScrolled(offset > 50);
    }

    return (
        <>
            <div className="flex flex-col w-full sm:w-80 shrink-0 relative bg-gray-600 rounded-sm">
                <div className={`px-3 flex flex-row justify-between items-center shrink-0 absolute top-0 left-0 right-0 z-[31] ${scrolled ? "bg-white" : ""}`}>
                    <div className="flex gap-2 items-center h-12">
                        <p className="text-white bg-pink-700 px-2 rounded-sm">{category}</p>
                        <p className="text-pink-700">{filteredTasks.length}</p>
                    </div>
                    <button
                        className="bg-blue-500 font-bold text-gray-200 px-5 py-1 rounded-md h-full text-center"
                        onClick={() => openCreateTask(category)}
                    >Add</button>
                </div>
                <div
                    className="flex flex-col gap-2 items-stretch overflow-y-scroll no-scrollbar absolute left-0 top-0 right-0 bottom-0 px-2 pt-12 pb-2"
                    onScroll={(e) => onScrollTrigger(e)}
                >
                    {
                        filteredTasks.sort((a, b) => b.createdAt - a.createdAt).map(t => (
                            <Task onSelect={item => onItemSelect(item)} key={t.id} data={t} />
                        ))
                    }

                </div>
            </div>
        </>
    );
}

export default TaskHolder;