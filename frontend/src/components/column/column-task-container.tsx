import { useDeleteTaskMutation } from "../../store/services/board-service";
import { Task } from "../../types/board-type";
import TaskCard from "../task-card";

function ColumnTaskContainer({ tasks }: { tasks: Task[], }) {
    return (
        tasks.map(t => (
            <TaskCard
                key={`task-${t.id}`}
                task={t}
            />
        ))
    );
}

export default ColumnTaskContainer;