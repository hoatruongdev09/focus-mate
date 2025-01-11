import { SortableContext } from "@dnd-kit/sortable";
import { Task } from "../../../types/board-type";
import TaskCard from "../task-card";

interface Props {
    tasks: Task[],
    taskIds: string[]
}

function ColumnTaskContainer(props: Props) {
    const { tasks, taskIds } = props
    return (
        <SortableContext items={taskIds} >
            {
                tasks.map(t => (
                    <TaskCard
                        key={`task-${t.id}`}
                        task={t}
                    />
                ))
            }
        </SortableContext>
    );
}

export default ColumnTaskContainer;