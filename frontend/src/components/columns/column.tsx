import { useDispatch } from "react-redux";
import Task from "../task/task";
import { setSelectingTask } from "../../store/slices/task-view-slice";
import { useState } from "react";
import { setEditingColumn } from "../../store/slices/column-slice";
import { ColumnData, TaskItem } from "../../types/board-type";
import { useGetTasksQuery } from "../../services/tasks";

function Column({ column, openCreateTask }: { column: ColumnData, openCreateTask: (category: ColumnData) => void }) {
    const dispatch = useDispatch()
    const { data, isLoading, isError, error } = useGetTasksQuery(column.id)
    const [scrolled, setScrolled] = useState(false)
    const [isHoverTitle, setIsHoverTitle] = useState<boolean>(false)

    const onItemSelect = (item: TaskItem) => {
        dispatch(setSelectingTask(item))
    }

    function onScrollTrigger(event: React.UIEvent<HTMLDivElement>): void {
        const offset = event.currentTarget.scrollTop;
        setScrolled(offset > 50);
    }

    const onMouseEnter = () => {
        setIsHoverTitle(true)
    }
    const onMouseExit = () => {
        setIsHoverTitle(false)
    }

    const onEdit = () => {
        dispatch(setEditingColumn(column))
    }

    if (isLoading) {
        return (<>LOADING COLUMN</>)
    } else if (isError) {
        return (<>{error.toString()}</>)
    }

    return (

        <>
            <div className="flex flex-col w-full sm:w-80 shrink-0 relative bg-gray-600 rounded-sm">
                <div className={`px-3 flex flex-row justify-between 
                                items-center shrink-0 absolute top-0 
                                left-0 right-0 z-[31] 
                                ${scrolled ? "bg-white" : ""}
                                `}
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseExit}
                >
                    <div className="flex flex-1 gap-2 items-center h-11">
                        <p className="text-white bg-pink-700 px-2 rounded-sm">{column.name}</p>
                        <p className="text-pink-700">{data?.length ?? 0}</p>
                    </div>
                    <div className={`flex gap-1 transition-opacity duration-300 ${isHoverTitle ? "opacity-100" : "opacity-0"}`}>
                        <button
                            className="bg-blue-500 font-bold text-gray-200 px-2 rounded-md h-full text-center"
                            onClick={onEdit}
                        >...</button>
                        <button
                            className="bg-blue-500 font-bold text-gray-200 px-2 rounded-md h-full text-center"
                            onClick={() => openCreateTask(column)}
                        >+</button>
                    </div>
                </div>
                <div
                    className="flex flex-col gap-2 items-stretch overflow-y-scroll no-scrollbar absolute left-0 top-0 right-0 bottom-0 px-2 pt-12 pb-2"
                    onScroll={(e) => onScrollTrigger(e)}
                >
                    {
                        data && data.map(t => (
                            <Task key={`task-${t.id}`} onSelect={item => onItemSelect(item)} data={t} />
                        ))
                    }

                </div>
            </div>
        </>
    );
}

export default Column;