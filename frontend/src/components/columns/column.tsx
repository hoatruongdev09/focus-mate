import { useState } from "react";
import { ColumnData } from "../../types/board-type";
import ColumnTasks from "./column-tasks";
import ColumnHeader from "./column-header";
import { useSelector } from "react-redux";
import { RootState } from "../../store/store";


function Column({ column }: { column: ColumnData }) {
    const allTasks = useSelector((state: RootState) => state.boardView.tasks)
    const [scrolled, setScrolled] = useState(false)


    function onScrollTrigger(event: React.UIEvent<HTMLDivElement>): void {
        const offset = event.currentTarget.scrollTop;
        setScrolled(offset > 50);
    }


    const filterTasks = () => {
        return allTasks.filter(t => t.group.id === column.id).sort((a, b) => a.order_by - b.order_by)
    }

    const localTasks = filterTasks()

    return (

        <>
            <div className="flex flex-col w-full sm:w-80 shrink-0 relative bg-gray-600 rounded-sm">
                <ColumnHeader column={column} tasks={localTasks} scrolled={scrolled} />
                <ColumnTasks column={column} tasks={localTasks} onScrollTrigger={onScrollTrigger} />
            </div>
        </>
    );
}

export default Column;