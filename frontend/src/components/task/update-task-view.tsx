import { ChangeEvent, useContext } from "react";
import { TaskItem, TaskPriority } from "../../types/board-type";
import { ColumnContext } from "../workspace";
import { useDispatch } from "react-redux";
import { setSelectingTask } from "../../store/slices/task-view-slice";


function UpdateTaskView({ task }: { task: TaskItem }) {
    const dispatch = useDispatch()
    const columns = useContext(ColumnContext)

    const onFormDataChange = (e: ChangeEvent<HTMLInputElement>) => {
        dispatch(setSelectingTask({
            ...task,
            [e.target.name]: e.target.value
        }))
    }
    const onFormTextAreaChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
        dispatch(setSelectingTask({
            ...task,
            [e.target.name]: e.target.value
        }))
    }
    const onFormOptionChange = (e: ChangeEvent<HTMLSelectElement>) => {
        switch (e.target.name) {
            case "group":
                const nextGroup = columns.find(g => g.id === +e.target.value)
                if (!nextGroup) { break }
                console.log(`next group: `, nextGroup)
                dispatch(setSelectingTask({
                    ...task,
                    [e.target.name]: nextGroup
                }))

                break;
            default:
                dispatch(setSelectingTask({
                    ...task,
                    [e.target.name]: e.target.value
                }))
                break;
        }
    }

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
                value={task.title}
                className="text-5xl bg-transparent outline-none font-bold text-gray-800"
                onChange={(e) => onFormDataChange(e)}
            />
            <div className="flex">
                <p className="w-32">Date created</p>
                <p className="flex-1">{formatDate(new Date(task.created_at))}</p>
            </div>

            <div className="flex">
                <p className="w-32">Status: </p>
                <select
                    name="group"
                    value={task.group.id}
                    onChange={(e) => onFormOptionChange(e)}
                    className="flex-1"
                >
                    {
                        columns.sort((a, b) => a.order_by - b.order_by).map(c => (
                            <option key={`column-${c.id}`} value={c.id}>{c.name}</option>
                        ))
                    }
                </select>
            </div>
            <div className="flex">
                <p className="w-32">Estimate</p>
                <input
                    name="estimate"
                    type="number"
                    value={task.estimate}
                    onChange={(e) => onFormDataChange(e)}
                    className="bg-transparent outline-none flex-1"
                />
            </div>
            <div className="flex">
                <p className="w-32">Priority</p>
                <select
                    name="priority"
                    value={task.priority}
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
                value={task.description}
                onChange={e => onFormTextAreaChange(e)}
                className="outline-none bg-transparent text-gray-800 flex-1"
            />
        </div>
    );
}

export default UpdateTaskView;