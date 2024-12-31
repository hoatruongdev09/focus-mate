import { ChangeEvent } from "react";
import { ColumnData } from "../../types/board-type";

function UpdateColumnView({ column, onFormDataChange, onFormTextAreaChange }: {
    column: ColumnData,
    onFormDataChange: (e: ChangeEvent<HTMLInputElement>) => void,
    onFormTextAreaChange: (e: ChangeEvent<HTMLTextAreaElement>) => void
}) {
    return (
        <div className="flex flex-col gap-2 flex-1 p-10">
            <input
                name="name"
                type="text"
                placeholder="New task"
                value={column.name}
                className="text-5xl bg-transparent outline-none font-bold text-gray-800"
                onChange={(e) => onFormDataChange(e)}
            />
            <div className="flex flex-col gap-2">
                <p className="w-32">Description</p>
                <textarea
                    name="description"
                    placeholder="Add more detail"
                    value={column.description}
                    onChange={e => onFormTextAreaChange(e)}
                    className="outline-none bg-transparent text-gray-800 flex-1"
                />
            </div>
        </div>
    );
}

export default UpdateColumnView;