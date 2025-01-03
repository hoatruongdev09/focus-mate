import { useState } from "react";
import { ColumnData } from "../../types/board-type";
import { useGetTasksQuery } from "../../services/tasks";
import ColumnTasks from "./column-tasks";
import ColumnHeader from "./column-header";


function Column({ column }: { column: ColumnData }) {

    const { data, isLoading } = useGetTasksQuery(column.id)
    const [scrolled, setScrolled] = useState(false)

    function onScrollTrigger(event: React.UIEvent<HTMLDivElement>): void {
        const offset = event.currentTarget.scrollTop;
        setScrolled(offset > 50);
    }

    if (isLoading) {
        return (<>LOADING COLUMN</>)
    }
    return (

        <>
            <div className="flex flex-col w-full sm:w-80 shrink-0 relative bg-gray-600 rounded-sm">
                <ColumnHeader column={column} tasks={data} scrolled={scrolled} />
                <ColumnTasks column={column} tasks={data} onScrollTrigger={onScrollTrigger} />
            </div>
        </>
    );
}

export default Column;