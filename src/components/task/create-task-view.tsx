import { ChangeEvent } from "react";
import { CreateTaskData, TaskPriority } from "../../store/slices/task-slices";

export interface CreateTaskViewProps {
    formState: CreateTaskData | null
    onFormDataChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onFormTextAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void,
    onFormPriorityChange: (e: ChangeEvent<HTMLSelectElement>) => void,
    onSubmit: () => void
}

function CreateTaskView({ formState, onFormDataChange, onFormTextAreaChange, onFormPriorityChange, onSubmit }: CreateTaskViewProps) {
    return (
        <div className="flex flex-1 p-5">
            <div className="flex flex-col gap-2 flex-1 ">
                <input
                    name="title"
                    type="text"
                    placeholder="New task"
                    value={formState?.title}
                    className="text-5xl bg-transparent outline-none font-bold text-gray-800"
                    onChange={(e) => onFormDataChange(e)}
                />
                <div className="flex">
                    <p className="w-32">Priority</p>
                    <select
                        name="priority"
                        value={formState?.priority}
                        onChange={e => onFormPriorityChange(e)}
                        className="bg-transparent outline-none flex-1"
                    >
                        <option value={TaskPriority.Low}>Low</option>
                        <option value={TaskPriority.Medium}>Medium</option>
                        <option value={TaskPriority.High}>High</option>
                    </select>
                </div>
                <div className="flex">
                    <p className="w-32">Estimate</p>
                    <input
                        name="estimate"
                        type="number"
                        value={formState?.estimate}
                        onChange={(e) => onFormDataChange(e)}
                        className="bg-transparent outline-none flex-1"
                    />
                </div>
                <textarea
                    name="description"
                    placeholder="Add more detail"
                    value={formState?.description}
                    onChange={e => onFormTextAreaChange(e)}
                    className="outline-none bg-transparent text-gray-800 flex-1"
                />

                <div className="flex flex-row-reverse gap-2">
                    <button className="bg-green-500 w-24 px-3 py-1" onClick={(() => onSubmit())}>Add</button>
                </div>
            </div>

        </div>
    );
}

export default CreateTaskView;