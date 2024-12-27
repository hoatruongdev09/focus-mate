import { TaskItem, TaskPriority } from "../../store/slices/task-slices";

function Task({ data, onSelect }: { data: TaskItem, onSelect: (item: TaskItem) => void }) {

    const { title, priority } = data

    const formatPriority = (p: TaskPriority) => {
        if (p == TaskPriority.Low) {
            return "Low"
        } else if (p == TaskPriority.Medium) {
            return "Medium"
        } else if (p == TaskPriority.High) {
            return "High"
        }
    }

    return (
        <div
            className="bg-gray-700 h-12 rounded-xl flex justify-between items-center px-4 py-2 shrink-0"
            onClick={e => onSelect(data)}
        >
            <p className="font-bold text-gray-200">{title}</p>
            <p className="bg-red-500 text-gray-200 px-2 rounded-full text-sm">{formatPriority(priority)}</p>
        </div>
    );
}

export default Task;