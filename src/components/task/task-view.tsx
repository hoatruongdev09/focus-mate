import { ChangeEvent } from "react";
import { CreateTaskData } from "../../store/slices/task-slices";

export interface TaskViewProps {
    formState: CreateTaskData | null
    onFormDataChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onFormTextAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    onFormPriorityChange: (e: ChangeEvent<HTMLSelectElement>) => void
}

function TaskView({ formState, onFormDataChange, onFormTextAreaChange, onFormPriorityChange }: TaskViewProps) {
    return (
        <div className="flex flex-col gap-2 flex-1">
            <input
                name="title"
                type="text"
                placeholder="New task"
                value={formState?.title}
                className="text-3xl bg-transparent outline-none font-bold text-gray-800"
                onChange={(e) => onFormDataChange(e)}
            />
            <textarea
                name="description"
                placeholder="Add more detail"
                value={formState?.description}
                onChange={e => onFormTextAreaChange(e)}
                className="outline-none bg-transparent text-gray-800"
            />
            <div className="flex justify-between">
                <input
                    name="estimate"
                    type="number"
                    value={formState?.estimate}
                    onChange={(e) => onFormDataChange(e)}
                    className="flex-1 bg-transparent outline-none"
                />
                <select
                    name="priority"
                    value={formState?.priority}
                    onChange={e => onFormPriorityChange(e)}
                    className="flex-1 bg-transparent outline-none"
                >
                    <option value={0}>Low</option>
                    <option value={1}>Medium</option>
                    <option value={2}>High</option>
                </select>
            </div>
        </div>
    );
}

export default TaskView;