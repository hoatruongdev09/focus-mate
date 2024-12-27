import { ChangeEvent } from "react";
import { TaskItem, TaskPriority } from "../../store/slices/task-slices";

interface UpdateTaskViewProps {
    taskState: TaskItem
    onFormDataChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onFormTextAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    onFormOptionChange: (e: ChangeEvent<HTMLSelectElement>) => void
}



function UpdateTaskView({
    taskState,
    onFormDataChange,
    onFormTextAreaChange,
    onFormOptionChange }: UpdateTaskViewProps) {


    const formatDate = (date: Date): string => {
        const options: Intl.DateTimeFormatOptions = {
            month: 'long',
            day: 'numeric',
            year: 'numeric',
            hour: 'numeric',
            minute: 'numeric',
            hour12: true,
        };

        return new Intl.DateTimeFormat('en-US', options).format(date).replace('at', ' ');
    }

    return (
        <div className="flex flex-col gap-2 flex-1 p-10">
            <input
                name="title"
                type="text"
                placeholder="New task"
                value={taskState.title}
                className="text-5xl bg-transparent outline-none font-bold text-gray-800"
                onChange={(e) => onFormDataChange(e)}
            />
            <div className="flex">
                <p className="w-32">Date created</p>
                <p className="flex-1">{formatDate(new Date(taskState.createdAt))}</p>
            </div>
            <div className="flex">
                <p className="w-32">Status: </p>
                <select
                    name="category"
                    value={taskState.category}
                    onChange={(e) => onFormOptionChange(e)}
                    className="flex-1"
                >
                    <option value={"todo"}>To do</option>
                    <option value={"doing"}>Doing</option>
                    <option value={"done"}>Done</option>
                </select>
            </div>
            <div className="flex">
                <p className="w-32">Estimate</p>
                <input
                    name="estimate"
                    type="number"
                    value={taskState.estimate}
                    onChange={(e) => onFormDataChange(e)}
                    className="bg-transparent outline-none flex-1"
                />
            </div>
            <div className="flex">
                <p className="w-32">Priority</p>
                <select
                    name="priority"
                    value={taskState.priority}
                    onChange={e => onFormOptionChange(e)}
                    className="bg-transparent outline-none flex-1"
                >
                    <option value={TaskPriority.Low}>Low</option>
                    <option value={TaskPriority.Medium}>Medium</option>
                    <option value={TaskPriority.High}>High</option>
                </select>
            </div>

            <textarea
                name="description"
                placeholder="Add more detail"
                value={taskState.description}
                onChange={e => onFormTextAreaChange(e)}
                className="outline-none bg-transparent text-gray-800 flex-1"
            />
        </div>
    );
}

export default UpdateTaskView;